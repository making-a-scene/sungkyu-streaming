// 클라이언트 이미지 업로드 유틸
// 이미지를 캔버스로 압축(최대 1600px, JPEG) 후 same-origin /api/upload 로 전송 → Blob URL 반환.
// 서버 경유라 CORS 없음. 압축으로 서버리스 함수 4.5MB body 한도 회피.

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지를 불러올 수 없습니다.'));
    };
    img.src = url;
  });
}

async function compress(
  file: File,
): Promise<{ dataBase64: string; contentType: string; filename: string }> {
  const img = await loadImage(file);
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width >= height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('이미지 처리에 실패했습니다.');
  ctx.drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
  const dataBase64 = dataUrl.split(',')[1] || '';
  const base = file.name.replace(/\.[^.]+$/, '') || 'image';
  return { dataBase64, contentType: 'image/jpeg', filename: `${base}.jpg` };
}

export async function uploadImage(file: File): Promise<string> {
  const payload = await compress(file);
  const r = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('이미지 업로드에 실패했습니다.');
  const data = await r.json();
  return data.url as string;
}
