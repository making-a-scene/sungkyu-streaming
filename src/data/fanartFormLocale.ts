// 금손시민둥이 전용(팬아트) 폼 - 다국어 텍스트 (Figma 2049)
// 메인 언어 토글(localStorage 'event-lang')대로 표시. ko 정확, en/zh/ja 는 ko fallback.

import type { Lang } from './eventLocale';

export const FANART_MAX_MESSAGE = 428;

export interface FanartFormMessages {
  title: string;
  uploadTitle: string;
  uploadCta: string;
  uploadHint: string;
  messagePlaceholder: string;
  writeComplete: string;
  backHome: string;
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
  doneTitle: string;
  doneSub: string;
  doneMore: string;
  submitError: string;
  uploadError: string;
}

const ko: FanartFormMessages = {
  title: '금손시민둥이 전용',
  uploadTitle: '팬아트 이미지 업로드',
  uploadCta: '이미지 업로드',
  uploadHint: '최대 1장 선택 가능',
  messagePlaceholder: '팬아트와 함께 전달하고 싶은 메시지가 있다면 적어주세요.',
  writeComplete: '작성 완료',
  backHome: '뒤로: 홈',
  consentTitle: '자료 제출 및 이용 안내',
  consentIntro: [
    'LV4 FINAL IN BUSAN 공연 기간 중 아티스트에게 전달될 메시지북 제작을 위해 시민둥이 여러분의 팬아트와 메시지를 모집합니다.',
    '제출해 주신 자료는 메시지북 제작에 사용되며, 해당 목적 외의 용도로는 사용되지 않습니다.',
  ],
  consentCautionTitle: '자료 제출 시 유의사항',
  consentCautions: [
    '본인이 직접 제작한 팬아트만 제출해 주세요. 타인의 저작물을 무단으로 사용하거나 편집한 이미지는 제출할 수 없습니다.',
    '연락처, 주소, 계정 정보 등 본인 또는 타인의 개인정보가 포함되지 않도록 작성해 주세요.',
    '이벤트 취지와 무관하거나 타인을 비방·모욕하는 등 부적절한 내용은 사용되지 않을 수 있습니다.',
  ],
  consentUseTitle: '자료 이용 안내',
  consentUses: [
    '이용 목적: 메시지북 제작',
    '이용 항목: 제출한 팬아트 이미지, 메시지, 이름 또는 닉네임(선택)',
  ],
  consentOutro: [
    '제출된 자료는 위 목적 범위 내에서만 사용되며, 메시지북 제작 완료 후 원본 자료는 일괄 삭제됩니다.',
    '제작된 메시지북은 LV4 FINAL IN BUSAN 공연 기간 중 아티스트에게 전달될 예정입니다.',
    '제작된 메시지북은 공연 및 팬이벤트 관련 기록 영상 또는 콘텐츠에 활용될 수 있으며, 이 경우 제출해 주신 이미지, 메시지, 이름 또는 닉네임이 포함될 수 있습니다.',
  ],
  consentCheck: '위 내용을 확인하였으며, 안내 사항에 동의합니다.',
  cont: '계속하기',
  backConsent: '뒤로: 자료 제출 동의',
  backWrite: '뒤로: 작성',
  reviewTitle: '제출 전 확인해주세요.',
  nicknameTitle: '이름 또는 닉네임(선택)',
  nicknameDesc: '보내주신 팬아트와 함께 메시지북에 수록됩니다.',
  nicknamePlaceholder: '예: 김규식',
  emailTitle: '완성된 결과물을 받아보시겠어요?(선택)',
  emailDesc: '이벤트 종료 후 메시지북 일부를 이메일로 보내드립니다.',
  emailPlaceholder: '이메일 주소',
  emailConsentTitle: '이메일 수집 및 이용 안내',
  emailConsentItems: [
    '수집 항목: 이메일 주소',
    '수집 목적: 메시지북 결과물(일부) 제공',
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
  uploadError: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
};

// TODO(번역): en/zh/ja Figma 텍스트로 교체. 현재 ko fallback.
const en: FanartFormMessages = ko;
const zh: FanartFormMessages = ko;
const ja: FanartFormMessages = ko;

export const fanartFormMessages: Record<Lang, FanartFormMessages> = { ko, en, zh, ja };
