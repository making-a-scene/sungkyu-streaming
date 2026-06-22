// LV4 FINAL 팬이벤트 - 메인 페이지 이벤트 영역 다국어 텍스트
//
// CLAUDE.md 지침: 텍스트/파라미터는 이 파일에서 일괄 관리한다.
// - 새 이벤트/문구 변경 시 이 파일만 수정하면 됨.
// - "이벤트 영역"(언어 토글/공지/카운트다운/4개 진입 카드)만 다국어 대상.
//   스밍/라디오/가이드 등 재사용 섹션은 한국어 유지.
// - 카드 desc 의 \n 은 Figma 줄바꿈 위치 (CSS white-space: pre-line 으로 렌더).
//
// en/zh/ja 번역 문구 포함. 문구 변경 시 각 언어 블록을 함께 갱신할 것.

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

const en: EventMessages = {
  noticeBadge: 'LV4 FINAL IN BUSAN Fan Event',
  noticeBody:
    'We\'re collecting photos you took yourself and your messages for the LV4 final concert video event and a special message book.\nWe\'d love to hear from you and appreciate your participation!',
  noticeFootnote: '*All fan events will be conducted in prior consultation with Billions.',
  countdownLabel: 'Submission Deadline:',
  deadlineNotice: 'Submission Deadline: July 1, 23:59 (KST)',
  cards: {
    memory: {
      title: 'LV4 Memories',
      desc: 'Share your LV4\nphotos & stories',
      cta: 'Join',
      countLabel: '{n} photos so far!',
    },
    letter: {
      title: 'Dear Sungkyu',
      desc: 'Send a message\nto Sungkyu',
      cta: 'Join',
      countLabel: '{n} entries so far!',
    },
    otm: {
      title: 'OTM Stories',
      desc: 'Why you love\nOFF THE MAP',
      cta: 'Join',
      countLabel: '{n} entries so far!',
    },
    fanart: {
      title: 'Fan Art',
      desc: 'Share your\nLV4 fan art',
      cta: 'Join',
      countLabel: '{n} entries so far!',
    },
  },
  emailInvalid: 'Please enter a valid email address.',
};

const zh: EventMessages = {
  noticeBadge: 'LV4 FINAL IN BUSAN 粉丝应援活动',
  noticeBody:
    '为了制作 LV4 最终场演唱会的视频应援和纪念留言册，\n现征集大家亲自拍摄的照片与想传达的留言。\n期待大家积极参与！',
  noticeFootnote: '*所有应援活动均已事先与 Billions 协商后进行。',
  countdownLabel: '征集截止时间：',
  deadlineNotice: '征集截止时间： 7月1日 23:59（KST）',
  cards: {
    memory: {
      title: 'LV4回忆集',
      desc: '请分享你在7个巡演城市\n拍下的照片与故事',
      cta: '参与',
      countLabel: '目前已累计{n}张！',
    },
    letter: {
      title: '致圣圭',
      desc: '在LV4巡演即将落幕之际\n向圣圭传达你的心意',
      cta: '参与',
      countLabel: '目前已累计{n}条！',
    },
    otm: {
      title: 'OTM故事',
      desc: '告诉我们[OFF THE MAP]\n为何如此特别',
      cta: '参与',
      countLabel: '目前已累计{n}条！',
    },
    fanart: {
      title: '粉丝创作',
      desc: '用满载爱意的粉丝创作\n记录 LV4',
      cta: '参与',
      countLabel: '目前已累计{n}条！',
    },
  },
  emailInvalid: '邮箱格式不正确。',
};

const ja: EventMessages = {
  noticeBadge: 'LV4 FINAL IN BUSAN ファンイベント',
  noticeBody:
    'LV4ファイナルコンサートでの映像イベントおよびメッセージブック制作のため、\nお写真とメッセージを募集しています。\nたくさんのご参加をお待ちしております！',
  noticeFootnote: '*すべてのファンイベントはBillionsと事前協議のうえ実施されます。',
  countdownLabel: '募集締切：',
  deadlineNotice: '募集締切： 7月1日 23:59（KST）',
  cards: {
    memory: {
      title: 'LV4メモリーズ',
      desc: 'LV4の写真や\nエピソードをシェア',
      cta: '参加する',
      countLabel: 'これまでに{n}枚！',
    },
    letter: {
      title: 'ソンギュへ',
      desc: 'ソンギュへ\nメッセージを届けよう',
      cta: '参加する',
      countLabel: 'これまでに{n}件！',
    },
    otm: {
      title: 'OTMストーリー',
      desc: 'OFF THE MAPが\n好きな理由',
      cta: '参加する',
      countLabel: 'これまでに{n}件！',
    },
    fanart: {
      title: 'ファンアート',
      desc: 'LV4ファンアートを\nシェア',
      cta: '参加する',
      countLabel: 'これまでに{n}件！',
    },
  },
  emailInvalid: '正しいメールアドレスを入力してください。',
};

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
