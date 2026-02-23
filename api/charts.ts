import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    await redis.set('key', 'value');
    const data = await redis.get('charts:latest');

    if (!data) {
      return res.status(404).json({ error: 'No chart data available yet' });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(typeof data === 'string' ? JSON.parse(data) : data);
  } catch (error) {
    console.error('Failed to fetch charts:', error);
    return res.status(500).json({ error: 'Failed to fetch charts' });
  }
}