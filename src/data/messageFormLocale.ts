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

const en: MessageFormMessages = {
  title: 'Dear Sungkyu',
  guides: [
    'Start with whatever question speaks to you most.',
    'Feel free to answer just one — no pressure.',
    'You can take part as many times as you like!',
  ],
  aboutLabel: 'To me, Sungkyu is',
  aboutSuffix: '!',
  aboutPlaceholder: 'e.g. comfort, a dream',
  whyLikeTitle: '428 reasons to love Sungkyu',
  whyLikePlaceholder: 'Start with whatever reason comes to mind right now.',
  bestStageTitle: 'Your favorite stage from LV4, and why',
  bestStagePlaceholder: 'Tell us what made that stage special.',
  letterTitle: 'To Sungkyu, finishing the LV4 tour!',
  letterPlaceholder:
    'Share the moments Sungkyu gave you strength, the times you were grateful, and everything you\'d like to say to cheer on what\'s ahead!',
  writeComplete: 'Done',
  backHome: 'Back: Home',
  consentTitle: 'Submission & Use of Materials',
  consentIntro: [
    'For the video event and message book at the LV4 FINAL IN BUSAN concert, we\'re collecting your photos and stories.',
    'From Seoul through every city to the Busan finale, we want to record the precious moments and memories seen through your eyes.',
    'The materials you submit will be used to produce the fan event video and message book, and for no other purpose.',
  ],
  consentCautionTitle: 'Please Note Before Submitting',
  consentCautions: [
    'Please don\'t include personal information — your own or others\' — such as contact details, addresses, or account info.',
    'Submitted content may be partially edited or excerpted to suit the purpose of the event.',
    'Content unrelated to the event, or that slanders or insults others, may not be used.',
  ],
  consentUseTitle: 'How Your Materials Are Used',
  consentUses: [
    'Purpose: producing the LV4 FINAL IN BUSAN concert fan event video and message book',
    'Items: the message you submit, and your name or nickname (optional)',
  ],
  consentOutro: [
    'Submitted materials will be used only within the scope above, and the original files will be deleted in full once the fan event video and message book are complete.',
    'However, the finished fan event video and message book may be used in concert- or fan-event-related footage or content, in which case your submitted message and name or nickname may be included.',
  ],
  consentCheck: 'I have read the above and agree to the terms.',
  cont: 'Continue',
  backConsent: 'Back: Consent',
  backWrite: 'Back: Writing',
  reviewTitle: 'Please review before submitting.',
  nicknameTitle: 'Name or nickname (optional)',
  nicknameDesc: 'It will appear in the message book alongside your message.',
  nicknamePlaceholder: 'e.g. Gyusik',
  emailTitle: 'Would you like to receive the finished work? (optional)',
  emailDesc: 'After the event, we\'ll email you the fan event video and part of the message book.',
  emailPlaceholder: 'Email address',
  emailConsentTitle: 'Email Collection & Use',
  emailConsentItems: [
    'Collected: email address',
    'Purpose: delivering the fan event video and part of the message book',
    'Retention: kept for 7 days after delivery, then deleted',
  ],
  emailConsentCheck: 'I agree to the collection and use of my email address to receive the finished work.',
  back: 'Back',
  submit: 'Submit',
  submitting: 'Submitting…',
  doneTitle: 'Your submission is complete.',
  doneSub: 'Thank you for taking part.',
  doneMore: 'There\'s still a story to finish together!',
  submitError: 'Submission failed. Please try again.',
};

const zh: MessageFormMessages = {
  title: '致圣圭',
  guides: [
    '从最触动你的问题开始写起吧。',
    '只回答其中一个问题也完全没关系。',
    '欢迎多次参与!',
  ],
  aboutLabel: '对我来说,圣圭是',
  aboutSuffix: '!',
  aboutPlaceholder: '例:慰藉、梦想',
  whyLikeTitle: '喜欢圣圭的428个理由',
  whyLikePlaceholder: '从此刻突然浮现的理由开始写吧。',
  bestStageTitle: '这次LV4中你最喜欢的舞台及理由',
  bestStagePlaceholder: '请告诉我们那个舞台为何特别。',
  letterTitle: '致即将结束LV4巡演的圣圭!',
  letterPlaceholder:
    '因圣圭而获得力量的瞬间、想对圣圭道谢的时刻、为今后活动加油或想要传达的话,都请尽情写下来吧!',
  writeComplete: '完成',
  backHome: '返回:首页',
  consentTitle: '资料提交及使用须知',
  consentIntro: [
    '为了在LV4 FINAL IN BUSAN演唱会上进行的影像活动与留言册制作,我们正在征集你的照片与故事。',
    '从首尔出发,途经各个城市,直至釜山终场,我们希望与你一同记录透过你的视角捕捉到的珍贵瞬间与回忆。',
    '你提交的资料将用于制作粉丝活动影像及留言册,不会用于该目的以外的用途。',
  ],
  consentCautionTitle: '提交资料时的注意事项',
  consentCautions: [
    '请勿在内容中包含联系方式、住址、账号信息等本人或他人的个人信息。',
    '提交的内容可能会根据活动目的进行部分编辑或摘录后使用。',
    '与活动主旨无关,或诽谤、侮辱他人等不当内容可能不会被采用。',
  ],
  consentUseTitle: '资料使用须知',
  consentUses: [
    '使用目的:制作LV4 FINAL IN BUSAN演唱会粉丝活动影像及留言册',
    '使用项目:提交的留言、姓名或昵称(选填)',
  ],
  consentOutro: [
    '提交的资料仅在上述范围内使用,粉丝活动影像及留言册制作完成后,提交的原始资料将被一并删除。',
    '但制作完成的粉丝活动影像与留言册,可能会用于演出及粉丝活动相关的记录影像或内容,此时可能会包含你提交的留言、姓名或昵称。',
  ],
  consentCheck: '我已确认上述内容,并同意相关须知。',
  cont: '继续',
  backConsent: '返回:资料提交同意',
  backWrite: '返回:填写',
  reviewTitle: '提交前请确认。',
  nicknameTitle: '姓名或昵称(选填)',
  nicknameDesc: '将与你的留言一同收录于留言册中。',
  nicknamePlaceholder: '例:圭植',
  emailTitle: '想收到完成的作品吗?(选填)',
  emailDesc: '活动结束后,我们会通过邮件向你发送粉丝活动影像及部分留言册。',
  emailPlaceholder: '邮箱地址',
  emailConsentTitle: '邮箱收集及使用须知',
  emailConsentItems: [
    '收集项目:邮箱地址',
    '收集目的:提供粉丝活动影像及留言册作品(部分)',
    '保存期限:作品发送后保存7天,随后删除',
  ],
  emailConsentCheck: '我同意为提供作品而收集和使用我的邮箱地址。',
  back: '返回',
  submit: '提交',
  submitting: '提交中…',
  doneTitle: '提交已完成。',
  doneSub: '感谢你的参与。',
  doneMore: '还有等待我们一起完成的故事!',
  submitError: '提交失败,请重试。',
};

const ja: MessageFormMessages = {
  title: 'ソンギュへ',
  guides: [
    '一番心に響く質問から書いてみてください。',
    '気軽に一つの質問だけ答えていただいても大丈夫です。',
    '何度でもご参加いただけます!',
  ],
  aboutLabel: '私にとってソンギュは',
  aboutSuffix: '!',
  aboutPlaceholder: '例:癒し、夢',
  whyLikeTitle: 'ソンギュが好きな428の理由',
  whyLikePlaceholder: '今ふと思い浮かんだ理由から書いてみてください。',
  bestStageTitle: '今回のLV4で一番良かったステージとその理由',
  bestStagePlaceholder: 'そのステージが特別だった理由を聞かせてください。',
  letterTitle: 'LV4ツアーを終えるソンギュへ!',
  letterPlaceholder:
    'ソンギュのおかげで力になった瞬間、ソンギュに感謝した瞬間、これからの活動への応援や伝えたかった言葉を、すべてお寄せください!',
  writeComplete: '完了',
  backHome: '戻る:ホーム',
  consentTitle: '資料の提出および利用案内',
  consentIntro: [
    'LV4 FINAL IN BUSANコンサートで行われる映像イベントとメッセージブック制作のため、皆さんの写真とエピソードを募集します。',
    'ソウルを皮切りに各都市を経て釜山ファイナルに至るまで、皆さんの視点で捉えた大切な瞬間と思い出を一緒に記録したいと思います。',
    'ご提出いただいた資料はファンイベント映像およびメッセージブックの制作に使用され、当該目的以外には使用されません。',
  ],
  consentCautionTitle: '資料提出時のご注意',
  consentCautions: [
    '連絡先、住所、アカウント情報など、ご本人または他人の個人情報が含まれないようご記入ください。',
    'ご提出いただいた内容は、イベントの目的に合わせて一部編集または抜粋して使用される場合があります。',
    'イベントの趣旨と無関係な内容や、他人を誹謗・侮辱するなど不適切な内容は使用されない場合があります。',
  ],
  consentUseTitle: '資料の利用案内',
  consentUses: [
    '利用目的:LV4 FINAL IN BUSANコンサート ファンイベント映像およびメッセージブック制作',
    '利用項目:ご提出いただいたメッセージ、お名前またはニックネーム(任意)',
  ],
  consentOutro: [
    'ご提出いただいたメッセージは上記の目的の範囲内でのみ使用され、ファンイベント映像およびメッセージブックの制作完了後、提出された原本資料は一括削除されます。',
    'ただし、制作されたファンイベント映像とメッセージブックは、公演およびファンイベント関連の記録映像またはコンテンツに活用される場合があり、その際にご提出いただいたメッセージ、お名前またはニックネームが含まれることがあります。',
  ],
  consentCheck: '上記の内容を確認し、案内事項に同意します。',
  cont: '続ける',
  backConsent: '戻る:資料提出の同意',
  backWrite: '戻る:作成',
  reviewTitle: '提出前にご確認ください。',
  nicknameTitle: 'お名前またはニックネーム(任意)',
  nicknameDesc: 'お寄せいただいた内容とともにメッセージブックに収録されます。',
  nicknamePlaceholder: '例:ギュシク',
  emailTitle: '完成した作品を受け取りますか?(任意)',
  emailDesc: 'イベント終了後、ファンイベント映像とメッセージブックの一部をメールでお送りします。',
  emailPlaceholder: 'メールアドレス',
  emailConsentTitle: 'メールアドレスの収集および利用案内',
  emailConsentItems: [
    '収集項目:メールアドレス',
    '収集目的:ファンイベント映像およびメッセージブック作品(一部)の提供',
    '保有期間:作品送付後7日間保管し、その後削除',
  ],
  emailConsentCheck: '作品提供のためのメールアドレスの収集および利用に同意します。',
  back: '戻る',
  submit: '提出する',
  submitting: '提出中…',
  doneTitle: '提出が完了しました。',
  doneSub: 'ご参加いただきありがとうございます。',
  doneMore: '一緒に完成させる物語がまだ残っています!',
  submitError: '提出に失敗しました。もう一度お試しください。',
};

export const messageFormMessages: Record<Lang, MessageFormMessages> = { ko, en, zh, ja };
