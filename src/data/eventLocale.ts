// LV4 FINAL 팬이벤트 - 메인 페이지 이벤트 영역 다국어 텍스트
//
// CLAUDE.md 지침: 텍스트/파라미터는 이 파일에서 일괄 관리한다.
// - 새 이벤트/문구 변경 시 이 파일만 수정하면 됨.
// - "이벤트 영역"(언어 토글/공지/카운트다운/4개 진입 카드)만 다국어 대상.
//   스밍/라디오/가이드 등 재사용 섹션은 한국어 유지.
// - 카드 desc 의 \n 은 Figma 줄바꿈 위치 (CSS white-space: pre-line 으로 렌더).
//
// TODO(번역): en/zh/ja 는 현재 한국어(ko) fallback 상태.
//   Figma 프레임에서 추출해 교체할 것:
//   - English : node 2032:2295
//   - 中文     : node 2032:2652
//   - 日本語   : node 2032:3009

export type Lang = 'ko' | 'en' | 'zh' | 'ja';

export const LANGS: Lang[] = ['ko', 'en', 'zh', 'ja'];

// 언어 토글 버튼에 표시되는 라벨 (각 언어 자기 표기)
export const LANG_LABELS: Record<Lang, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  ja: '日本語',
};

export interface EventCardText {
  title: string;
  desc: string;       // \n = 줄바꿈
  cta: string;        // "참여하기"
  countLabel: string; // 누적 카운트 문구. {n} 자리에 실제 수치 치환
}

export interface EventMessages {
  noticeBadge: string;     // 빨강 점 옆 배지 문구
  noticeBody: string;      // 공지 본문
  noticeFootnote: string;  // * 주석
  countdownLabel: string;  // "모집 마감까지"
  deadlineNotice: string;  // 카운트다운 전 정적 마감 안내 텍스트
  cards: {
    memory: EventCardText;  // LV4 추억 모으기
    letter: EventCardText;  // To. 성규
    otm: EventCardText;     // 우리가 사랑한 OTM
    fanart: EventCardText;  // 금손시민둥이 전용(팬아트)
  };
  emailInvalid: string;     // 폼 공통: 이메일 형식 오류 안내 (4개 폼 공유)
}

const ko: EventMessages = {
  noticeBadge: 'LV4 FINAL IN BUSAN 팬이벤트 준비중',
  noticeBody:
    'LV4 파이널 콘서트에서의 영상 이벤트와\n메시지북 제작을 위해 시민둥이 여러분께서 직접 찍은 사진과 메시지를 모집합니다! 많은 관심과 참여 부탁드립니다!',
  noticeFootnote: '*모든 팬이벤트는 소속사와 사전 협의 후 진행됩니다.',
  countdownLabel: '모집 마감까지',
  deadlineNotice: '7/1(수) 23:59 (KST) 모집 마감',
  cards: {
    memory: {
      title: 'LV4 추억 모으기',
      desc: '7개 투어 도시에서의\n사진과 사연을 보내주세요',
      cta: '참여하기',
      countLabel: '지금까지 {n}장 누적!',
    },
    letter: {
      title: 'To. 성규',
      desc: 'LV4 투어의 끝을 향하는\n성규에게 마음을 전해요',
      cta: '참여하기',
      countLabel: '지금까지 {n}건 누적!',
    },
    otm: {
      title: '우리가 사랑한 OTM',
      desc: '[OFF THE MAP]이\n특별한 이유를 들려주세요',
      cta: '참여하기',
      countLabel: '지금까지 {n}건 누적!',
    },
    fanart: {
      title: '금손시민둥이 전용',
      desc: '애정가득 팬아트로\nLV4를 기록해요',
      cta: '참여하기',
      countLabel: '지금까지 {n}건 누적!',
    },
  },
  emailInvalid: '올바른 이메일 형식이 아닙니다.',
};

// TODO(번역): 아래 3개 언어는 Figma 추출 텍스트로 교체. 현재는 한국어 fallback.
const en: EventMessages = ko;
const zh: EventMessages = ko;
const ja: EventMessages = ko;

export const eventMessages: Record<Lang, EventMessages> = { ko, en, zh, ja };

// 카운트 문구 치환 헬퍼: "지금까지 {n}장 누적!" -> "지금까지 428장 누적!"
export const formatCount = (template: string, n: number): string =>
  template.replace('{n}', n.toLocaleString());

// --- 언어 상태 (localStorage 저장: 메인 -> 폼 페이지까지 선택 유지) ---
const STORAGE_KEY = 'event-lang';

export const getStoredLang = (): Lang => {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (v && LANGS.includes(v)) return v;
  } catch {
    /* localStorage 접근 불가 시 기본값 */
  }
  return 'ko';
};

export const storeLang = (lang: Lang): void => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* noop */
  }
};
