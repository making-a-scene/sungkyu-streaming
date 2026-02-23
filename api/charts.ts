import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_REST_TOKEN!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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