// To. 성규 폼 - 다국어 텍스트 (Figma 2042)
// 메인 언어 토글(localStorage 'event-lang')대로 표시. ko 정확, en/zh/ja 는 ko fallback.

import type { Lang } from './eventLocale';

export const MSG_MAX_WHY = 428;
export const MSG_MAX_STAGE = 428;
export const MSG_MAX_LETTER = 4280;
export const MSG_MAX_ABOUT = 40;

export interface MessageFormMessages {
  title: string;
  // 작성
  guides: string[];
  aboutLabel: string;
  aboutSuffix: string;
  aboutPlaceholder: string;
  whyLikeTitle: string;
  whyLikePlaceholder: string;
  bestStageTitle: string;
  bestStagePlaceholder: string;
  letterTitle: string;
  letterPlaceholder: string;
  writeComplete: string;
  backHome: string;
  // 동의
  consentTitle: string;
  consentIntro: string[];
  consentCautionTitle: string;
  consentCautions: string[];
  consentUseTitle: string;
  consentUses: string[];
  consentOutro: string[];
  consentCheck: string;
  cont: string;
  backConsent: string;
  backWrite: string;
  // 제출 확인
  reviewTitle: string;
  nicknameTitle: string;
  nicknameDesc: string;
  nicknamePlaceholder: string;
  emailTitle: string;
  emailDesc: string;
  emailPlaceholder: string;
  emailConsentTitle: string;
  emailConsentItems: string[];
  emailConsentCheck: string;
  back: string;
  submit: string;
  submitting: string;
  // 완료
  doneTitle: string;
  doneSub: string;
  doneMore: string;
  submitError: string;
}

const ko: MessageFormMessages = {
  title: 'To. 성규',
  guides: [
    '가장 마음이 머무는 질문부터 적어보세요.',
    '부담없이 질문 하나에만 답해주셔도 좋아요.',
    '여러 번 참여하셔도 됩니다!',
  ],
  aboutLabel: '나에게 성규는',
  aboutSuffix: '(이)다!',
  aboutPlaceholder: '예: 위로, 꿈',
  whyLikeTitle: '성규가 좋은 428가지 이유',
  whyLikePlaceholder: '지금 문득 떠오르는 이유부터 적어보세요.',
  bestStageTitle: '이번 LV4에서 가장 좋았던 무대와 그 이유',
  bestStagePlaceholder: '그 무대가 특별했던 이유를 들려주세요.',
  letterTitle: 'LV4 투어를 마치는 성규에게!',
  letterPlaceholder:
    '성규 덕분에 힘이 되었던 순간, 성규에게 고마웠던 순간, 앞으로의 활동을 응원하거나 전하고 싶었던 말을 모두 보내주세요!',
  writeComplete: '작성 완료',
  backHome: '뒤로: 홈',
  consentTitle: '자료 제출 및 이용 안내',
  consentIntro: [
    'LV4 FINAL IN BUSAN 콘서트에서 진행될 영상 이벤트와 메시지북 제작을 위해 시민둥이 여러분의 사진과 사연을 모집합니다.',
    '서울을 시작으로 각 도시를 지나 부산 파이널에 이르기까지, 시민둥이의 시선으로 담아낸 소중한 순간들과 추억들을 함께 기록하고자 합니다.',
    '제출해 주신 자료는 팬이벤트 영상 및 메시지북 제작에 사용되며, 해당 목적 외의 용도로는 사용되지 않습니다.',
  ],
  consentCautionTitle: '자료 제출 시 유의사항',
  consentCautions: [
    '연락처, 주소, 계정 정보 등 본인 또는 타인의 개인정보가 포함되지 않도록 작성해 주세요.',
    '제출된 내용은 이벤트 목적에 맞게 일부 편집 또는 발췌되어 사용될 수 있습니다.',
    '이벤트 취지와 무관하거나 타인을 비방·모욕하는 등 부적절한 내용은 사용되지 않을 수 있습니다.',
  ],
  consentUseTitle: '자료 이용 안내',
  consentUses: [
    '이용 목적: LV4 FINAL IN BUSAN 콘서트 팬이벤트 영상 및 메시지북 제작',
    '이용 항목: 제출한 메시지, 이름 또는 닉네임(선택)',
  ],
  consentOutro: [
    '제출된 사진 및 메시지는 위 목적 범위 내에서만 사용되며, 팬이벤트 영상 및 메시지북 제작 완료 후 제출된 원본 자료는 일괄 삭제됩니다.',
    '다만, 제작된 팬이벤트 영상과 메시지북은 공연 및 팬이벤트 관련 기록 영상 또는 콘텐츠에 활용될 수 있으며, 이 경우 제출해 주신 메시지, 이름 또는 닉네임이 포함될 수 있습니다.',
  ],
  consentCheck: '위 내용을 확인하였으며, 안내 사항에 동의합니다.',
  cont: '계속하기',
  backConsent: '뒤로: 자료 제출 동의',
  backWrite: '뒤로: 작성',
  reviewTitle: '제출 전 확인해주세요.',
  nicknameTitle: '이름 또는 닉네임(선택)',
  nicknameDesc: '보내주신 내용과 함께 메시지북에 수록됩니다.',
  nicknamePlaceholder: '예: 김규식',
  emailTitle: '완성된 결과물을 받아보시겠어요?(선택)',
  emailDesc: '이벤트 종료 후 팬이벤트 영상과 메시지북 일부를 이메일로 보내드립니다.',
  emailPlaceholder: '이메일 주소',
  emailConsentTitle: '이메일 수집 및 이용 안내',
  emailConsentItems: [
    '수집 항목: 이메일 주소',
    '수집 목적: 팬이벤트 영상 및 메시지북 결과물(일부) 제공',
    '보유 기간: 결과물 발송 후 7일간 보관 후 삭제',
  ],
  emailConsentCheck: '결과물 제공을 위한 이메일 주소 수집 및 이용에 동의합니다.',
  back: '뒤로',
  submit: '제출하기',
  submitting: '제출 중…',
  doneTitle: '제출이 완료되었습니다.',
  doneSub: '참여해 주셔서 감사합니다.',
  doneMore: '함께 완성할 이야기가 남아 있어요!',
  submitError: '제출에 실패했습니다. 다시 시도해주세요.',
};

// TODO(번역): en/zh/ja Figma 텍스트로 교체. 현재 ko fallback.
const en: MessageFormMessages = ko;
const zh: MessageFormMessages = ko;
const ja: MessageFormMessages = ko;

export const messageFormMessages: Record<Lang, MessageFormMessages> = { ko, en, zh, ja };
