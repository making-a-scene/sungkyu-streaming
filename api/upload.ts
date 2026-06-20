import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

// 이미지 업로드용 클라이언트 업로드 토큰 발급 (Vercel Blob)
//
// 프론트(폼)에서 @vercel/blob/client 의 upload() 가 이 엔드포인트를 호출하면,
// 토큰을 발급해 브라우저가 Blob 스토리지로 파일을 직접 PUT 한다.
// (서버리스 함수 4.5MB body 제한을 우회 + 여러 장 업로드에 적합)
//
// 필요 환경변수: BLOB_READ_WRITE_TOKEN (Vercel Blob 스토어 연결 시 자동 주입)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const body = req.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
      }),
      // 업로드 완료 콜백 (로컬 dev 에선 호출되지 않음 — 운영에서만 동작)
      onUploadCompleted: async () => {
        /* 필요 시 후처리 */
      },
    });
    return res.status(200).json(jsonResponse);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
}
