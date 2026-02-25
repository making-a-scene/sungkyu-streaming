import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    const at = req.query.at as string | undefined;
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;

    // KST 문자열을 UTC unix timestamp로 변환 (타임존 명시가 없으면 KST로 간주)
    const toUtcSeconds = (s: string) => {
      const hasTimezone = /[Zz]$|[+-]\d{2}:?\d{0,2}$/.test(s);
      const date = new Date(hasTimezone ? s : `${s}+09:00`);
      return Math.floor(date.getTime() / 1000);
    };

    // 특정 시각 조회: GET /api/charts?at=2026-02-24T15:00
    if (at) {
      const target = toUtcSeconds(at);
      const ONE_HOUR = 3600;

      const results = await redis.zRangeByScoreWithScores(
        'charts:history',
        target - ONE_HOUR,
        target + ONE_HOUR,
      );

      if (results.length === 0) {
        return res.status(404).json({ error: 'No chart data found near the specified time' });
      }

      // 지정 시각에 가장 가까운 스냅샷 선택
      let closest = results[0];
      let minDiff = Math.abs(closest.score - target);
      for (const entry of results) {
        const diff = Math.abs(entry.score - target);
        if (diff < minDiff) {
          closest = entry;
          minDiff = diff;
        }
      }

      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
      return res.status(200).json(JSON.parse(closest.value));
    }

    // 기간 범위 조회: GET /api/charts?from=...&to=...
    if (from) {
      const fromTs = toUtcSeconds(from);
      const toTs = to ? toUtcSeconds(to) : Math.floor(Date.now() / 1000);

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
    console.error('Failed to fetch charts:', error);
    return res.status(500).json({ error: 'Failed to fetch charts' });
  }
}
