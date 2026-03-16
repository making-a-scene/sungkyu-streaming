import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { crawlAll, type CrawlData } from '../lib/crawlers';
import { formatTweet, formatChartInTweet } from '../lib/tweet-formatter';
import { postTweet } from '../lib/twitter';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    const data = await crawlAll();
    const json = JSON.stringify(data);
    const now = Math.floor(Date.now() / 1000);
    const THIRTY_DAYS = 30 * 24 * 60 * 60;

    await redis.set('charts:latest', json);
    await redis.zAdd('charts:history', { score: now, value: json });
    await redis.zRemRangeByScore('charts:history', 0, now - THIRTY_DAYS);

    // KST 시간 계산
    const kstNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    const hour = kstNow.getHours();
    const isSilentHour = hour >= 2 && hour <= 6;

    // 트윗 포맷 전환 시점
    const OLD_FORMAT_END = new Date('2026-03-17T01:00:00+09:00');   // 기존 포맷 마지막
    const NEW_FORMAT_START = new Date('2026-03-17T07:00:00+09:00'); // 새 포맷 시작

    let tweeted = false;
    if (isSilentHour) {
      console.log(`Skipping tweet: silent hour (KST ${hour}시)`);
    } else try {
      let previous: CrawlData | null = null;
      const prevEntries = await redis.zRangeWithScores(
        'charts:history',
        now - 1,  // max (REV이므로 max 먼저)
        0,        // min
        { BY: 'SCORE', REV: true, LIMIT: { offset: 0, count: 1 } },
      );
      if (prevEntries.length > 0) {
        previous = JSON.parse(prevEntries[0].value);
      }

      let tweetText: string | null;
      const currentTime = new Date();

      tweetText = formatChartInTweet(data, previous); // 차트인한 차트만 트윗

      if (tweetText) {
        await postTweet(tweetText);
        tweeted = true;
      } else if (currentTime >= OLD_FORMAT_END && currentTime < NEW_FORMAT_START) {
        console.log('Skipping tweet: transition period (01:00~07:00 KST 2026-03-17)');
      } else {
        console.log('Skipping tweet: no charts currently charting');
      }
    } catch (tweetError) {
      console.error('Tweet failed:', tweetError);
    }

    return res.status(200).json({ ok: true, updated_at: data.updated_at, tweeted });
  } catch (error) {
    console.error('Crawl failed:', error);
    return res.status(500).json({ error: 'Crawl failed' });
  }
}
