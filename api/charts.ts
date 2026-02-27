import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    const at = req.query.at as string | undefined;
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;

    // KST "YYYY-MM-DDThh" 형식을 해당 시의 시작 UTC unix timestamp로 변환
    const toHourTs = (s: string) => {
      const hour = s.slice(0, 13); // "YYYY-MM-DDThh" 까지만 사용
      const date = new Date(`${hour}:00+09:00`);
      return Math.floor(date.getTime() / 1000);
    };

    // 특정 시각 조회: GET /api/prompts?at=2026-02-24T15
    if (at) {
      const hourStart = toHourTs(at);
      const hourEnd = hourStart + 3600;

      const results = await redis.zRangeByScoreWithScores(
        'charts:history',
        hourStart,
        hourEnd,
      );

      if (results.length === 0) {
        return res.status(404).json({ error: 'No chart data found for the specified hour' });
      }

      // 해당 시간대 첫 번째 스냅샷 반환
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
      return res.status(200).json(JSON.parse(results[0].value));
    }

    // 기간 범위 조회: GET /api/prompts?from=2026-02-24T09&to=2026-02-24T15
    if (from) {
      const fromTs = toHourTs(from);
      const toTs = to ? toHourTs(to) + 3600 : Math.floor(Date.now() / 1000);

      const results = await redis.zRangeByScoreWithScores('charts:history', fromTs, toTs);

      if (results.length === 0) {
        return res.status(404).json({ error: 'No chart data found in the specified range' });
      }

      const snapshots = results.map((entry) => JSON.parse(entry.value));

      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
      return res.status(200).json({ count: snapshots.length, snapshots });
    }

    // 기본: 최신 차트 반환
    const data = await redis.get('charts:latest');

    if (!data) {
      return res.status(404).json({ error: 'No chart data available yet' });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error('Failed to fetch prompts:', error);
    return res.status(500).json({ error: 'Failed to fetch prompts' });
  }
}