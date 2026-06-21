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
  // 업로드 화면 첫 진입 안내 팝업 (Figma 2055:1331)
  uploadIntroTitle: string[];
  uploadIntroItems: string[];
  uploadIntroConfirm: string;
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
    `${city} LV4 공연에서 기억에 남은 순간이 있었다면 자유롭게 남겨주세요.`,
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
  uploadIntroTitle: ['LV4의 추억이 담긴 사진이라면', '무엇이든 좋습니다!'],
  uploadIntroItems: [
    '공연장 안팎에서 응원봉, 굿즈, 슬로건, 풍선 등과 함께한 사진',
    '공연 후 뒷풀이 사진',
    '투어 도시에서의 여행 사진',
    '온라인 스트리밍 시청 인증 등',
  ],
  uploadIntroConfirm: '확인',
};

const en: TourFormMessages = {
  title: 'LV4 Memories',
  citiesPrompt: 'Select all the tour cities you attended.',
  accumulated: (n) => `${n} photos`,
  cont: 'Continue',
  backHome: 'Back: Home',
  consentTitle: 'Submission & Use of Materials',
  consentIntro: [
    'For the video event and message book at the LV4 FINAL IN BUSAN concert, we\'re collecting your photos and stories.',
    'From Seoul through every city to the Busan finale, we want to record the precious moments and memories seen through your eyes.',
    'The materials you submit will be used to produce the fan event video and message book, and for no other purpose.',
  ],
  consentCautionTitle: 'Please Note Before Submitting',
  consentCautions: [
    'Please submit only photos you took yourself. Images you didn\'t take — such as social media posts, news articles, or video captures — cannot be submitted.',
    'If someone other than you is identifiable in a photo, please blur or otherwise de-identify them before submitting.',
    'Please don\'t include personal information — your own or others\' — such as contact details, addresses, or account info.',
    'Submitted content may be partially edited or excerpted to suit the purpose of the event.',
    'Content unrelated to the event, or that slanders or insults others, may not be used.',
  ],
  consentUseTitle: 'How Your Materials Are Used',
  consentUses: [
    'Purpose: producing the LV4 FINAL IN BUSAN concert fan event video and message book',
    'Items: the photos and messages you submit',
  ],
  consentOutro: [
    'Submitted photos and messages will be used only within the scope above, and the original files will be deleted in full once the fan event video and message book are complete.',
    'However, the finished fan event video and message book may be used in concert- or fan-event-related footage or content, in which case your submitted photos and messages may be included.',
  ],
  consentCheck: 'I have read the above and agree to the terms.',
  backCities: 'Back: City selection',
  uploadCta: 'Upload photos',
  uploadHint: 'Up to 3 photos',
  photoMemoPlaceholder: 'Add a note to your photo.',
  cityMessagePlaceholder: (city) =>
    `If you have an unforgettable moment from the ${city} LV4 show, feel free to share it.`,
  next: (city) => `Next: ${city}`,
  complete: 'Done',
  backConsent: 'Back: Consent',
  backTo: (city) => `Back: ${city}`,
  reviewTitle: 'Please review before submitting.',
  summaryPhotos: (n) => `${n} photo${n === 1 ? '' : 's'}`,
  summaryPhotosMsg: (n) => `${n} photo${n === 1 ? '' : 's'}, message added`,
  reviewTotal: (n) => `You're submitting memories from ${n} cit${n === 1 ? 'y' : 'ies'} in total.`,
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
  submit: 'Submit',
  submitting: 'Submitting…',
  doneTitle: 'Your submission is complete.',
  doneSub: 'Thank you for taking part.',
  doneMore: 'There\'s still a story to finish together!',
  uploadError: 'Image upload failed. Please try again.',
  maxPhotoError: 'You can upload up to 3 photos per city.',
  uploadIntroTitle: ['Any photo that holds an LV4 memory', 'is welcome!'],
  uploadIntroItems: [
    'Photos with your light stick, goods, slogans, balloons, and more — inside or outside the venue',
    'After-party photos following the show',
    'Travel photos from the tour cities',
    'Proof of watching the online stream, and more',
  ],
  uploadIntroConfirm: 'OK',
};

const zh: TourFormMessages = {
  title: 'LV4回忆集',
  citiesPrompt: '请选择你观看过的所有巡演城市。',
  accumulated: (n) => `已累计${n}张`,
  cont: '继续',
  backHome: '返回:首页',
  consentTitle: '资料提交及使用须知',
  consentIntro: [
    '为了在LV4 FINAL IN BUSAN演唱会上进行的影像活动与留言册制作,我们正在征集你的照片与故事。',
    '从首尔出发,途经各个城市,直至釜山终场,我们希望与你一同记录透过你的视角捕捉到的珍贵瞬间与回忆。',
    '你提交的资料将用于制作粉丝活动影像及留言册,不会用于该目的以外的用途。',
  ],
  consentCautionTitle: '提交资料时的注意事项',
  consentCautions: [
    '请只提交本人亲自拍摄的照片。SNS帖子、报道、视频截图等非本人拍摄的图片不可提交。',
    '若照片中可识别出本人以外的他人面部,请务必进行马赛克等去识别化处理后再提交。',
    '请勿在内容中包含联系方式、住址、账号信息等本人或他人的个人信息。',
    '提交的内容可能会根据活动目的进行部分编辑或摘录后使用。',
    '与活动主旨无关,或诽谤、侮辱他人等不当内容可能不会被采用。',
  ],
  consentUseTitle: '资料使用须知',
  consentUses: [
    '使用目的:制作LV4 FINAL IN BUSAN演唱会粉丝活动影像及留言册',
    '使用项目:提交的照片及留言',
  ],
  consentOutro: [
    '提交的照片及留言仅在上述范围内使用,粉丝活动影像及留言册制作完成后,提交的原始资料将被一并删除。',
    '但制作完成的粉丝活动影像与留言册可能会用于演出及粉丝活动相关的记录影像或内容,此时可能会包含你提交的照片及留言。',
  ],
  consentCheck: '我已确认上述内容,并同意相关须知。',
  backCities: '返回:选择城市',
  uploadCta: '上传照片',
  uploadHint: '最多可选择3张',
  photoMemoPlaceholder: '为照片留下备注吧。',
  cityMessagePlaceholder: (city) =>
    `如果在${city}的LV4演出中有令你难忘的瞬间,请尽情写下来吧。`,
  next: (city) => `下一步:${city}`,
  complete: '完成',
  backConsent: '返回:收集·使用同意',
  backTo: (city) => `返回:${city}`,
  reviewTitle: '提交前请确认。',
  summaryPhotos: (n) => `照片${n}张`,
  summaryPhotosMsg: (n) => `照片${n}张,已填写留言`,
  reviewTotal: (n) => `共提交${n}个城市的回忆。`,
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
  submit: '提交',
  submitting: '提交中…',
  doneTitle: '提交已完成。',
  doneSub: '感谢你的参与。',
  doneMore: '还有等待我们一起完成的故事!',
  uploadError: '图片上传失败,请重试。',
  maxPhotoError: '每个城市最多可上传3张照片。',
  uploadIntroTitle: ['只要是承载LV4回忆的照片', '什么都可以!'],
  uploadIntroItems: [
    '在演出场馆内外与应援棒、周边、口号牌、气球等的合影',
    '演出后的庆功聚会照片',
    '在巡演城市的旅行照片',
    '在线直播观看认证等',
  ],
  uploadIntroConfirm: '确认',
};

const ja: TourFormMessages = {
  title: 'LV4メモリーズ',
  citiesPrompt: '観覧したツアー都市をすべて選択してください。',
  accumulated: (n) => `${n}枚`,
  cont: '続ける',
  backHome: '戻る:ホーム',
  consentTitle: '資料の提出および利用案内',
  consentIntro: [
    'LV4 FINAL IN BUSANコンサートで行われる映像イベントとメッセージブック制作のため、皆さんの写真とエピソードを募集します。',
    'ソウルを皮切りに各都市を経て釜山ファイナルに至るまで、皆さんの視点で捉えた大切な瞬間と思い出を一緒に記録したいと思います。',
    'ご提出いただいた資料はファンイベント映像およびメッセージブックの制作に使用され、当該目的以外には使用されません。',
  ],
  consentCautionTitle: '資料提出時のご注意',
  consentCautions: [
    'ご本人が直接撮影した写真のみご提出ください。SNSの投稿、記事、映像のキャプチャなど、ご本人が撮影していない画像は提出できません。',
    '写真にご本人以外の人物の顔が識別可能な形で含まれている場合は、必ずモザイクなどの非識別化処理を行ったうえでご提出ください。',
    '連絡先、住所、アカウント情報など、ご本人または他人の個人情報が含まれないようご記入ください。',
    'ご提出いただいた内容は、イベントの目的に合わせて一部編集または抜粋して使用される場合があります。',
    'イベントの趣旨と無関係な内容や、他人を誹謗・侮辱するなど不適切な内容は使用されない場合があります。',
  ],
  consentUseTitle: '資料の利用案内',
  consentUses: [
    '利用目的:LV4 FINAL IN BUSANコンサート ファンイベント映像およびメッセージブック制作',
    '利用項目:ご提出いただいた写真およびメッセージ',
  ],
  consentOutro: [
    'ご提出いただいた写真およびメッセージは上記の目的の範囲内でのみ使用され、ファンイベント映像およびメッセージブックの制作完了後、提出された原本資料は一括削除されます。',
    'ただし、制作されたファンイベント映像とメッセージブックは、公演およびファンイベント関連の記録映像またはコンテンツに活用される場合があり、その際にご提出いただいた写真およびメッセージが含まれることがあります。',
  ],
  consentCheck: '上記の内容を確認し、案内事項に同意します。',
  backCities: '戻る:都市選択',
  uploadCta: '写真をアップロード',
  uploadHint: '最大3枚まで選択可能',
  photoMemoPlaceholder: '写真にメモを残してください。',
  cityMessagePlaceholder: (city) =>
    `${city}のLV4公演で、心に残る瞬間があれば自由にお書きください。`,
  next: (city) => `次へ:${city}`,
  complete: '完了',
  backConsent: '戻る:収集・利用の同意',
  backTo: (city) => `戻る:${city}`,
  reviewTitle: '提出前にご確認ください。',
  summaryPhotos: (n) => `写真${n}枚`,
  summaryPhotosMsg: (n) => `写真${n}枚、メッセージ記入`,
  reviewTotal: (n) => `計${n}都市の思い出を提出します。`,
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
  submit: '提出する',
  submitting: '提出中…',
  doneTitle: '提出が完了しました。',
  doneSub: 'ご参加いただきありがとうございます。',
  doneMore: '一緒に完成させる物語がまだ残っています!',
  uploadError: '画像のアップロードに失敗しました。もう一度お試しください。',
  maxPhotoError: '1都市につき最大3枚までアップロードできます。',
  uploadIntroTitle: ['LV4の思い出が詰まった写真なら', '何でも大歓迎です!'],
  uploadIntroItems: [
    '会場の内外でペンライト、グッズ、スローガン、風船などと一緒に撮った写真',
    '公演後の打ち上げ写真',
    'ツアー都市での旅行写真',
    'オンライン配信の視聴認証など',
  ],
  uploadIntroConfirm: '確認',
};

export const tourFormMessages: Record<Lang, TourFormMessages> = { ko, en, zh, ja };
