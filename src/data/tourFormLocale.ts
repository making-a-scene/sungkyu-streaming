// LV4 추억 모으기 폼 - 다국어 텍스트
//
// 메인 페이지 언어 토글(localStorage 'event-lang')에서 고른 언어로 표시.
// 한국어(ko)는 Figma(2038) 확정 텍스트. en/zh/ja 는 텍스트 확보 전까지 ko fallback.
// TODO(번역): en/zh/ja Figma 프레임 확보되면 교체.

import type { Lang } from './eventLocale';

export interface TourFormMessages {
  title: string;
  // 1) 도시 선택
  citiesPrompt: string;
  accumulated: (n: number) => string; // "{n}장 누적"
  cont: string; // 계속하기
  backHome: string;
  // 2) 동의
  consentTitle: string;
  consentIntro: string[];
  consentCautionTitle: string;
  consentCautions: string[];
  consentUseTitle: string;
  consentUses: string[];
  consentOutro: string[];
  consentCheck: string;
  backCities: string;
  // 3) 업로드
  uploadCta: string;
  uploadHint: string;
  photoMemoPlaceholder: string;
  cityMessagePlaceholder: (city: string) => string;
  next: (city: string) => string; // "다음: {city}"
  complete: string;
  backConsent: string;
  backTo: (city: string) => string; // "뒤로: {city}"
  // 4) 제출 확인
  reviewTitle: string;
  summaryPhotos: (n: number) => string; // "사진 {n}장"
  summaryPhotosMsg: (n: number) => string; // "사진 {n}장, 메시지 작성"
  reviewTotal: (n: number) => string; // "총 {n}개 도시의 추억을 제출합니다."
  emailTitle: string;
  emailDesc: string;
  emailPlaceholder: string;
  emailConsentTitle: string;
  emailConsentItems: string[];
  emailConsentCheck: string;
  submit: string;
  submitting: string;
  // 5) 완료
  doneTitle: string;
  doneSub: string;
  doneMore: string;
  // 공통
  uploadError: string;
  maxPhotoError: string;
}

const ko: TourFormMessages = {
  title: 'LV4 추억 모으기',
  citiesPrompt: '관람한 투어 도시를 모두 선택해주세요.',
  accumulated: (n) => `${n}장 누적`,
  cont: '계속하기',
  backHome: '뒤로: 홈',
  consentTitle: '자료 제출 및 이용 안내',
  consentIntro: [
    'LV4 FINAL IN BUSAN 콘서트에서 진행될 영상 이벤트와 메시지북 제작을 위해 시민둥이 여러분의 사진과 사연을 모집합니다.',
    '서울을 시작으로 각 도시를 지나 부산 파이널에 이르기까지, 시민둥이의 시선으로 담아낸 소중한 순간들과 추억들을 함께 기록하고자 합니다.',
    '제출해 주신 자료는 팬이벤트 영상 및 메시지북 제작에 사용되며, 해당 목적 외의 용도로는 사용되지 않습니다.',
  ],
  consentCautionTitle: '자료 제출 시 유의사항',
  consentCautions: [
    '본인이 직접 촬영한 사진만 제출해 주세요. SNS 게시물, 기사, 영상 캡처 등 본인이 촬영하지 않은 이미지는 제출할 수 없습니다.',
    '사진에 본인 외 타인의 얼굴이 식별 가능하게 포함된 경우, 반드시 모자이크 등 비식별 처리를 진행한 후 제출해 주세요.',
    '연락처, 주소, 계정 정보 등 본인 또는 타인의 개인정보가 포함되지 않도록 작성해 주세요.',
    '제출된 내용은 이벤트 목적에 맞게 일부 편집 또는 발췌되어 사용될 수 있습니다.',
    '이벤트 취지와 무관하거나 타인을 비방·모욕하는 등 부적절한 내용은 사용되지 않을 수 있습니다.',
  ],
  consentUseTitle: '자료 이용 안내',
  consentUses: [
    '이용 목적: LV4 FINAL IN BUSAN 콘서트 팬이벤트 영상 및 메시지북 제작',
    '이용 항목: 제출한 사진 및 메시지',
  ],
  consentOutro: [
    '제출된 사진 및 메시지는 위 목적 범위 내에서만 사용되며, 팬이벤트 영상 및 메시지북 제작 완료 후 제출된 원본 자료는 일괄 삭제됩니다.',
    '다만, 제작된 팬이벤트 영상과 메시지북은 공연 및 팬이벤트 관련 기록 영상 또는 콘텐츠로 활용될 수 있으며, 이 경우 제출해 주신 사진 및 메시지가 포함될 수 있습니다.',
  ],
  consentCheck: '위 내용을 확인하였으며, 안내 사항에 동의합니다.',
  backCities: '뒤로: 도시 선택',
  uploadCta: '사진 업로드',
  uploadHint: '최대 3장 선택 가능',
  photoMemoPlaceholder: '사진에 메모를 남겨주세요.',
  cityMessagePlaceholder: (city) =>
    `${city} LV4 공연에서 오래도록 기억에 남을 순간이 있었다면 자유롭게 남겨주세요.`,
  next: (city) => `다음: ${city}`,
  complete: '완료',
  backConsent: '뒤로: 수집·이용 동의',
  backTo: (city) => `뒤로: ${city}`,
  reviewTitle: '제출 전 확인해주세요.',
  summaryPhotos: (n) => `사진 ${n}장`,
  summaryPhotosMsg: (n) => `사진 ${n}장, 메시지 작성`,
  reviewTotal: (n) => `총 ${n}개 도시의 추억을 제출합니다.`,
  emailTitle: '완성된 결과물을 받아보시겠어요? (선택)',
  emailDesc: '이벤트 종료 후 팬이벤트 영상과 메시지북 일부를 이메일로 보내드립니다.',
  emailPlaceholder: '이메일 주소',
  emailConsentTitle: '이메일 수집 및 이용 안내',
  emailConsentItems: [
    '수집 항목: 이메일 주소',
    '수집 목적: 팬이벤트 영상 및 메시지북 결과물(일부) 제공',
    '보유 기간: 결과물 발송 후 7일간 보관 후 삭제',
  ],
  emailConsentCheck: '결과물 제공을 위한 이메일 주소 수집 및 이용에 동의합니다.',
  submit: '제출하기',
  submitting: '제출 중…',
  doneTitle: '제출이 완료되었습니다.',
  doneSub: '참여해 주셔서 감사합니다.',
  doneMore: '함께 완성할 이야기가 남아 있어요!',
  uploadError: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
  maxPhotoError: '도시당 최대 3장까지 업로드할 수 있습니다.',
};

// TODO(번역): 아래 3개 언어는 Figma 추출 텍스트로 교체. 현재 한국어 fallback.
const en: TourFormMessages = ko;
const zh: TourFormMessages = ko;
const ja: TourFormMessages = ko;

export const tourFormMessages: Record<Lang, TourFormMessages> = { ko, en, zh, ja };
