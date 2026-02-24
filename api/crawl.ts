import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { crawlAll } from '../lib/crawlers';

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

    return res.status(200).json({ ok: true, updated_at: data.updated_at });
  } catch (error) {
    console.error('Crawl failed:', error);
    return res.status(500).json({ error: 'Crawl failed' });
  }
}
