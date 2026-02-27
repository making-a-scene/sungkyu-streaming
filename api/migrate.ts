import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

/**
 * 일회성 마이그레이션: prompts:* → charts:* 로 데이터 복사
 * 실행 후 이 파일을 삭제할 것
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    // 1. prompts:history → charts:history (sorted set)
    const allEntries = await redis.zRangeWithScores('prompts:history', 0, -1);
    let historyMigrated = 0;

    if (allEntries.length > 0) {
      const members = allEntries.map((entry) => ({
        score: entry.score,
        value: entry.value,
      }));
      // 기존 charts:history에 없는 데이터만 추가 (NX)
      for (const member of members) {
        await redis.zAdd('charts:history', { score: member.score, value: member.value }, { NX: true });
        historyMigrated++;
      }
    }

    // 2. prompts:latest → charts:latest (덮어쓰기)
    const latest = await redis.get('prompts:latest');
    let latestMigrated = false;
    if (latest) {
      await redis.set('charts:latest', latest);
      latestMigrated = true;
    }

    await redis.disconnect();

    return res.status(200).json({
      ok: true,
      historyMigrated,
      latestMigrated,
      message: '마이그레이션 완료. 이 파일(api/migrate.ts)을 삭제하세요.',
    });
  } catch (error) {
    console.error('Migration failed:', error);
    return res.status(500).json({ error: 'Migration failed', detail: String(error) });
  }
}
