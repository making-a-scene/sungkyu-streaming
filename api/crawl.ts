import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { crawlAll } from '../lib/crawlers';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    await redis.set('key', 'value');
    const data = await crawlAll();
    await redis.set('charts:latest', JSON.stringify(data));
    return res.status(200).json({ ok: true, updated_at: data.updated_at });
  } catch (error) {
    console.error('Crawl failed:', error);
    return res.status(500).json({ error: 'Crawl failed' });
  }
}
