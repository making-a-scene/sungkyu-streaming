import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

// LV4 팬이벤트 폼 제출 저장/조회 API
//
// Redis 키:
//   submissions:<type>        (List)   - 제출 레코드 JSON (LPUSH = 최신순)
//   counts:<type>             (String) - 제출 건수
//   counts:tour:photos        (Hash)   - 투어 도시별 사진 수 { cityId: n }
//   counts:tour:photosTotal   (String) - 투어 사진 총 장수
//
// 엔드포인트:
//   POST /api/submissions                       - 제출 저장
//   GET  /api/submissions?action=counts         - 누적 카운트(공개, 메인 카드용)
//   GET  /api/submissions?type=<t>  (+비번)     - 제출 목록(관리자)

const FORM_TYPES = ['message', 'album', 'fanart', 'tour'] as const;
type FormType = (typeof FORM_TYPES)[number];

const isFormType = (v: unknown): v is FormType =>
  typeof v === 'string' && (FORM_TYPES as readonly string[]).includes(v);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await createClient({ url: process.env.REDIS_URL }).connect();

    // ---------- 제출 저장 ----------
    if (req.method === 'POST') {
      const { formType, lang, data } = req.body || {};
      if (!isFormType(formType)) {
        return res.status(400).json({ error: 'invalid formType' });
      }
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: 'missing data' });
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const createdAt = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' });
      const record = { id, formType, lang: lang || 'ko', createdAt, data };

      await redis.lPush(`submissions:${formType}`, JSON.stringify(record));
      await redis.incr(`counts:${formType}`);

      // 투어: 도시별 사진 수 + 총 장수 누적
      if (formType === 'tour' && Array.isArray(data.cities)) {
        let total = 0;
        for (const c of data.cities) {
          const n = Array.isArray(c?.photos) ? c.photos.length : 0;
          if (n > 0 && c?.cityId) await redis.hIncrBy('counts:tour:photos', c.cityId, n);
          total += n;
        }
        if (total > 0) await redis.incrBy('counts:tour:photosTotal', total);
      }

      return res.status(200).json({ ok: true, id });
    }

    // ---------- 조회 ----------
    if (req.method === 'GET') {
      // 공개: 메인 카드 누적 카운트
      if (req.query.action === 'counts') {
        const [message, album, fanart, tour, photosTotal] = await Promise.all([
          redis.get('counts:message'),
          redis.get('counts:album'),
          redis.get('counts:fanart'),
          redis.get('counts:tour'),
          redis.get('counts:tour:photosTotal'),
        ]);
        const tourPhotos = await redis.hGetAll('counts:tour:photos');
        res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
        return res.status(200).json({
          message: Number(message || 0),
          album: Number(album || 0),
          fanart: Number(fanart || 0),
          tour: Number(tour || 0),
          tourPhotosTotal: Number(photosTotal || 0),
          tourPhotos: Object.fromEntries(
            Object.entries(tourPhotos).map(([k, v]) => [k, Number(v)]),
          ),
        });
      }

      // 관리자: 제출 목록 (비밀번호 필요)
      const password =
        (req.headers['x-admin-password'] as string) || (req.query.password as string);
      if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'unauthorized' });
      }
      const type = req.query.type;
      if (!isFormType(type)) {
        return res.status(400).json({ error: 'invalid type' });
      }
      const raw = await redis.lRange(`submissions:${type}`, 0, -1);
      return res.status(200).json({
        count: raw.length,
        submissions: raw.map((r) => JSON.parse(r)),
      });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    console.error('submissions error:', e);
    return res.status(500).json({ error: 'server error' });
  }
}
