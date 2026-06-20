import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

// 서버 경유 이미지 업로드.
// 클라이언트는 same-origin(/api/upload)으로만 요청 → CORS 발생 자체가 없음.
// 클라에서 압축한 base64 를 받아 Blob 에 저장하고 URL 을 돌려준다.
// (서버리스 함수 body 한도 4.5MB 대비, 업로드 전 클라 압축이 전제)
//
// 필요 환경변수: BLOB_READ_WRITE_TOKEN

export const config = {
  api: { bodyParser: { sizeLimit: '5mb' } },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  try {
    const { filename, contentType, dataBase64 } = req.body || {};
    if (!dataBase64 || typeof dataBase64 !== 'string') {
      return res.status(400).json({ error: 'missing image data' });
    }
    const buffer = Buffer.from(dataBase64, 'base64');
    const blob = await put(filename || 'image.jpg', buffer, {
      access: 'public',
      contentType: contentType || 'image/jpeg',
      addRandomSuffix: true,
      // Blob 스토어를 BLOB_V2 prefix 로 연결했으므로 토큰 이름이 다름.
      // (put 은 기본적으로 BLOB_READ_WRITE_TOKEN 만 자동 인식)
      token: process.env.BLOB_V2_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
    });
    return res.status(200).json({ url: blob.url });
  } catch (error) {
    console.error('blob upload error:', error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
