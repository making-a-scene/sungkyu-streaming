// LV4 FINAL 팬이벤트 - 폼 저장 데이터 모델 + 정적 데이터
//
// 폼 UI 디자인은 미확정이지만, 저장할 항목은 와이어프레임에서 확정됨.
// - 폼 UI 구현 시 이 타입에 맞춰 /api/submissions 로 POST.
// - 이미지(팬아트/투어 사진)는 /api/upload(Vercel Blob)로 먼저 올려 URL 확보 후 함께 저장.

import type { Lang } from './eventLocale';

// ===== 투어 도시 (LV4 추억 모으기) =====
export interface TourCity {
  id: string;
  name: Record<Lang, string>; // 도시명 다국어 (메인 언어 토글대로 표시)
  dateLabel: string;
}

// Figma 도시 선택 화면(2032:237) 기준. 새 공연 추가 시 여기만 수정.
export const TOUR_CITIES: TourCity[] = [
  { id: 'seoul', name: { ko: '서울', en: 'Seoul', zh: '首尔', ja: 'ソウル' }, dateLabel: '2026.03.27-29' },
  { id: 'macau', name: { ko: '마카오', en: 'Macau', zh: '澳门', ja: 'マカオ' }, dateLabel: '2026.04.11' },
  { id: 'hongkong', name: { ko: '홍콩', en: 'Hong Kong', zh: '香港', ja: '香港' }, dateLabel: '2026.05.02-03' },
  { id: 'taiwan', name: { ko: '타이베이', en: 'Taipei', zh: '臺北', ja: '臺北' }, dateLabel: '2026.05.16' },
  { id: 'hochiminh', name: { ko: '호치민', en: 'Ho Chi Minh', zh: '胡志明市', ja: 'ホーチミン' }, dateLabel: '2026.06.13' },
  { id: 'kaohsiung', name: { ko: '가오슝', en: 'Kaohsiung', zh: '高雄', ja: '高雄' }, dateLabel: '2026.06.20' },
  { id: 'manila', name: { ko: '마닐라', en: 'Manila', zh: '马尼拉', ja: 'マニラ' }, dateLabel: '2026.06.28' },
];

export const MAX_PHOTOS_PER_CITY = 3;

// ===== OFF THE MAP 트랙리스트 (우리가 사랑한 OTM) =====
export interface OtmTrack {
  id: number;
  title: string;
  titleEn: string;
}

export const OTM_TRACKS: OtmTrack[] = [
  { id: 1, title: '널 떠올리면', titleEn: 'When I think about you' },
  { id: 2, title: 'Over It', titleEn: '' },
  { id: 3, title: 'Dreaming', titleEn: '' },
  { id: 4, title: '그림', titleEn: 'Portrait' },
  { id: 5, title: '모범답안', titleEn: 'Answer' },
];

// 곡명 표시(전 언어 공통): 한국어 원제 + 영어 병기 "원제 (titleEn)".
// 원제가 영어인 곡은 titleEn 이 비어 있어 원제만 표시된다.
export const formatTrackTitle = (t: OtmTrack): string =>
  t.titleEn ? `${t.title} (${t.titleEn})` : t.title;

// ===== 폼 종류 =====
export type EventFormType = 'message' | 'album' | 'fanart' | 'tour';

// ===== 폼별 저장 데이터 =====

// To. 성규 (2032:86)
export interface MessageFormData {
  nickname?: string;    // 이름 또는 닉네임 (선택)
  email?: string;       // 이메일 (선택)
  aboutSungkyu: string; // "나에게 성규는 ___ (이)다!"
  whyLike: string;      // "성규가 좋은 428가지 이유" (~428자)
  bestStage: string;    // "이번 LV4에서 가장 좋았던 무대와 그 이유" (~428자)
  letter: string;       // "LV4 투어를 마치는 성규에게!" (~4280자)
}

// 우리가 사랑한 OTM (2032:152)
export interface AlbumLikedSong {
  trackId: number;
  title: string;
  reason: string; // 좋아하는 이유 (~4280자)
}
export interface AlbumFormData {
  nickname?: string;       // 이름 또는 닉네임 (선택)
  email?: string;          // 이메일 (선택)
  whyLike: string;         // "OTM 활동에서 기억에 남는 순간은?" (~4280자)
  songs: AlbumLikedSong[]; // 좋아하는 곡 + 이유 (여러 곡 선택 가능)
}

// 팬아트 (2032:197)
export interface FanartFormData {
  nickname?: string; // 이름 또는 닉네임 (선택)
  email?: string;    // 이메일 (선택)
  imageUrl: string;  // 팬아트 이미지 URL (Vercel Blob)
  message: string;   // 함께 전달할 메시지 (~428자)
}

// LV4 추억 모으기 (2032:237~460)
export interface TourPhoto {
  url: string;     // Vercel Blob URL
  caption: string; // 사진별 메모
}
export interface TourCityEntry {
  cityId: string;      // TOUR_CITIES.id
  message: string;     // 도시별 메시지 (~500자)
  photos: TourPhoto[]; // 최대 MAX_PHOTOS_PER_CITY 장
}
export interface TourFormData {
  email?: string;          // 제출자 이메일 (선택)
  cities: TourCityEntry[]; // 선택한 도시들
}

export type EventFormData =
  | MessageFormData
  | AlbumFormData
  | FanartFormData
  | TourFormData;

// ===== 저장 레코드 (Redis submissions:<type> 리스트의 각 원소) =====
export interface EventSubmission {
  id: string;
  formType: EventFormType;
  lang: Lang;
  createdAt: string; // KST "YYYY-MM-DD HH:mm:ss"
  data: EventFormData;
}

// 메인 카드 누적 카운트 (/api/submissions?action=counts 응답)
export interface EventCounts {
  message: number;
  album: number;
  fanart: number;
  tour: number;            // 투어 제출 건수
  tourPhotosTotal: number; // 투어 사진 총 장수 (추억 카드 "N장 누적")
  tourPhotos: Record<string, number>; // 도시별 사진 수 (도시 선택 화면)
}
