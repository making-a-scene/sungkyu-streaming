// 금손시민둥이 전용(팬아트) 폼 - 다국어 텍스트 (Figma 2049)
// 메인 언어 토글(localStorage 'event-lang')대로 표시. ko 기준, en/zh/ja 번역 문구 포함.

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

const en: FanartFormMessages = {
  title: 'Fan Art',
  uploadTitle: 'Upload your fan art',
  uploadCta: 'Upload image',
  uploadHint: 'Up to 1 image',
  messagePlaceholder: 'If there\'s a message you\'d like to send along with your fan art, write it here.',
  writeComplete: 'Done',
  backHome: 'Back to Home',
  consentTitle: 'Submission & Use of Materials',
  consentIntro: [
    'For the message book to be delivered to the artist during the LV4 FINAL IN BUSAN concert, we\'re collecting your fan art and messages.',
    'The materials you submit will be used to produce the message book, and for no other purpose.',
  ],
  consentCautionTitle: 'Please Note Before Submitting',
  consentCautions: [
    'Please submit only fan art you created yourself. Images that use or edit others\' work without permission cannot be submitted.',
    'Please don\'t include personal information — your own or others\' — such as contact details, addresses, or account info.',
    'Content unrelated to the event, or that slanders or insults others, may not be used.',
  ],
  consentUseTitle: 'How Your Materials Are Used',
  consentUses: [
    'Purpose: producing the message book',
    'Items: the fan art image and message you submit, and your name or nickname (optional)',
  ],
  consentOutro: [
    'Submitted materials will be used only within the scope above, and the original files will be deleted in full once the message book is complete.',
    'The finished message book will be delivered to the artist during the LV4 FINAL IN BUSAN concert.',
    'The finished message book may be used in concert- or fan-event-related footage or content, in which case your submitted image, message, and name or nickname may be included.',
  ],
  consentCheck: 'I have read the above and agree to the terms.',
  cont: 'Continue',
  backConsent: 'Back to Consent',
  backWrite: 'Back to Writing',
  reviewTitle: 'Please review before submitting.',
  nicknameTitle: 'Name or nickname (optional)',
  nicknameDesc: 'It will appear in the message book alongside your fan art.',
  nicknamePlaceholder: 'e.g. Gyusik',
  emailTitle: 'Would you like to receive the completed message book? (optional)',
  emailDesc: 'After the event, we\'ll email you part of the message book.',
  emailPlaceholder: 'Email address',
  emailConsentTitle: 'Email Collection & Use',
  emailConsentItems: [
    'Collected: email address',
    'Purpose: delivering part of the completed message book',
    'Retention: kept for 7 days after delivery, then deleted',
  ],
  emailConsentCheck: 'I agree to the collection and use of my email address to receive part of the completed message book.',
  back: 'Back',
  submit: 'Submit',
  submitting: 'Submitting…',
  doneTitle: 'Your submission is complete.',
  doneSub: 'Thank you for taking part.',
  doneMore: 'There\'s still a story to finish together!',
  submitError: 'Submission failed. Please try again.',
  uploadError: 'Image upload failed. Please try again.',
};

const zh: FanartFormMessages = {
  title: '粉丝创作',
  uploadTitle: '上传粉丝创作图片',
  uploadCta: '上传图片',
  uploadHint: '最多可选择1张',
  messagePlaceholder: '如果有想随粉丝创作一起传达的留言，请写在这里。',
  writeComplete: '完成',
  backHome: '返回首页',
  consentTitle: '资料提交及使用须知',
  consentIntro: [
    '为了制作将在LV4 FINAL IN BUSAN演出期间转交给艺人的留言册，我们正在征集你的粉丝创作与留言。',
    '你提交的资料将用于留言册制作，不会用于该目的以外的用途。',
  ],
  consentCautionTitle: '提交资料时的注意事项',
  consentCautions: [
    '请只提交本人原创的粉丝创作。不得提交未经授权使用或编辑他人作品的图片。',
    '请勿在内容中包含联系方式、住址、账号信息等本人或他人的个人信息。',
    '与活动主旨无关，或诽谤、侮辱他人等不当内容可能不会被采用。',
  ],
  consentUseTitle: '资料使用须知',
  consentUses: [
    '使用目的：留言册制作',
    '使用项目：提交的粉丝创作图片、留言、姓名或昵称（选填）',
  ],
  consentOutro: [
    '提交的资料仅在上述范围内使用，留言册制作完成后，原始资料将被一并删除。',
    '制作完成的留言册将在LV4 FINAL IN BUSAN演出期间转交给艺人。',
    '制作完成的留言册可能会用于演出及粉丝活动相关的记录影像或内容，此时可能会包含你提交的图片、留言、姓名或昵称。',
  ],
  consentCheck: '我已确认上述内容，并同意相关须知。',
  cont: '继续',
  backConsent: '返回资料提交同意',
  backWrite: '返回填写',
  reviewTitle: '提交前请确认。',
  nicknameTitle: '姓名或昵称（选填）',
  nicknameDesc: '将与你的粉丝创作一同收录于留言册中。',
  nicknamePlaceholder: '例：圭植',
  emailTitle: '想收到完成后的留言册吗？（选填）',
  emailDesc: '活动结束后，我们会通过邮件向你发送部分留言册。',
  emailPlaceholder: '邮箱地址',
  emailConsentTitle: '邮箱收集及使用须知',
  emailConsentItems: [
    '收集项目：邮箱地址',
    '收集目的：提供部分完成后的留言册',
    '保存期限：留言册发送后保存7天，随后删除',
  ],
  emailConsentCheck: '我同意为接收完成后的留言册而收集和使用我的邮箱地址。',
  back: '返回',
  submit: '提交',
  submitting: '提交中…',
  doneTitle: '提交已完成。',
  doneSub: '感谢你的参与。',
  doneMore: '还有等待我们一起完成的故事！',
  submitError: '提交失败，请重试。',
  uploadError: '图片上传失败，请重试。',
};

const ja: FanartFormMessages = {
  title: 'ファンアート',
  uploadTitle: 'ファンアート画像のアップロード',
  uploadCta: '画像をアップロード',
  uploadHint: '最大1枚まで選択可能',
  messagePlaceholder: 'ファンアートとともに伝えたいメッセージがあれば書いてください。',
  writeComplete: '完了',
  backHome: 'ホームに戻る',
  consentTitle: '資料の提出および利用案内',
  consentIntro: [
    'LV4 FINAL IN BUSAN公演期間中にアーティストへ届けられるメッセージブック制作のため、皆さんのファンアートとメッセージを募集します。',
    'ご提出いただいた資料はメッセージブックの制作に使用され、当該目的以外には使用されません。',
  ],
  consentCautionTitle: '資料提出時のご注意',
  consentCautions: [
    'ご本人が制作したファンアートのみご提出ください。他人の著作物を無断で使用または編集した画像は提出できません。',
    '連絡先、住所、アカウント情報など、ご本人または他人の個人情報が含まれないようご記入ください。',
    'イベントの趣旨と無関係な内容や、他人を誹謗・侮辱するなど不適切な内容は使用されない場合があります。',
  ],
  consentUseTitle: '資料の利用案内',
  consentUses: [
    '利用目的：メッセージブック制作',
    '利用項目：ご提出いただいたファンアート画像、メッセージ、お名前またはニックネーム（任意）',
  ],
  consentOutro: [
    'ご提出いただいた資料は上記の目的の範囲内でのみ使用され、メッセージブックの制作完了後、原本資料は一括削除されます。',
    '制作されたメッセージブックは、LV4 FINAL IN BUSAN公演期間中にアーティストへ届けられる予定です。',
    '制作されたメッセージブックは、公演およびファンイベント関連の記録映像またはコンテンツに活用される場合があり、その際にご提出いただいた画像、メッセージ、お名前またはニックネームが含まれることがあります。',
  ],
  consentCheck: '上記の内容を確認し、案内事項に同意します。',
  cont: '続ける',
  backConsent: '資料提出の同意に戻る',
  backWrite: '作成に戻る',
  reviewTitle: '提出前にご確認ください。',
  nicknameTitle: 'お名前またはニックネーム（任意）',
  nicknameDesc: 'お寄せいただいたファンアートとともにメッセージブックに収録されます。',
  nicknamePlaceholder: '例：ギュシク',
  emailTitle: '完成したメッセージブックを受け取りますか？（任意）',
  emailDesc: 'イベント終了後、メッセージブックの一部をメールでお送りします。',
  emailPlaceholder: 'メールアドレス',
  emailConsentTitle: 'メールアドレスの収集および利用案内',
  emailConsentItems: [
    '収集項目：メールアドレス',
    '収集目的：メッセージブック（一部）の提供',
    '保有期間：メッセージブック送付後7日間保管し、その後削除',
  ],
  emailConsentCheck: 'メッセージブック提供のためのメールアドレスの収集および利用に同意します。',
  back: '戻る',
  submit: '提出する',
  submitting: '提出中…',
  doneTitle: '提出が完了しました。',
  doneSub: 'ご参加いただきありがとうございます。',
  doneMore: '一緒に完成させる物語がまだ残っています！',
  submitError: '提出に失敗しました。もう一度お試しください。',
  uploadError: '画像のアップロードに失敗しました。もう一度お試しください。',
};

export const fanartFormMessages: Record<Lang, FanartFormMessages> = { ko, en, zh, ja };
