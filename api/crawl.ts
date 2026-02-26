import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { crawlAll, type CrawlData } from '../lib/crawlers';
import { formatTweet } from '../lib/tweet-formatter';
import { postTweet } from '../lib/twitter';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    const data = await crawlAll();
    const json = JSON.stringify(data);
    const now = Math.floor(Date.now() / 1000);
    const THIRTY_DAYS = 30 * 24 * 60 * 60;

    await redis.set('prompts:latest', json);
    await redis.zAdd('prompts:history', { score: now, value: json });
    await redis.zRemRangeByScore('prompts:history', 0, now - THIRTY_DAYS);

    // Fetch previous snapshot for rank change comparison
    let tweeted = false;
    try {
      let previous: CrawlData | null = null;
      const prevEntries = await redis.zRangeWithScores(
        'prompts:history',
        now - 1,  // max (REV이므로 max 먼저)
        0,        // min
        { BY: 'SCORE', REV: true, LIMIT: { offset: 0, count: 1 } },
      );
      if (prevEntries.length > 0) {
        previous = JSON.parse(prevEntries[0].value);
      }

      const tweetText = formatTweet(data, previous);
      await postTweet(tweetText);
      tweeted = true;
    } catch (tweetError) {
      console.error('Tweet failed:', tweetError);
    }

    return res.status(200).json({ ok: true, updated_at: data.updated_at, tweeted });
  } catch (error) {
    console.error('Crawl failed:', error);
    return res.status(500).json({ error: 'Crawl failed' });
  }
}
