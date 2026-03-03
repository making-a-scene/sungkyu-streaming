export type Broadcaster = 'KBS' | 'SBS' | 'MBC';

export interface RadioStation {
    broadcaster: Broadcaster;
    stationName: string;
    frequency: string;
    logo: string;
    smsLink: string;
}

export interface RadioProgram {
    broadcaster: Broadcaster;
    programName: string;
    djNickname?: string;
    note?: string;
    startHour: number;
    endHour: number; // 24 = midnight
    days?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat. undefined = every day
    highChance: boolean;
}

export const RADIO_STATIONS: RadioStation[] = [
    {
        broadcaster: 'SBS',
        stationName: 'SBS 파워FM',
        frequency: '107.7MHz',
        logo: '/radio-sbs-logo.png',
        smsLink: 'sms:%231077?body=%EA%B9%80%EC%84%B1%EA%B7%9C%EC%9D%98%20%EB%84%90%20%EB%96%A0%EC%98%AC%EB%A6%AC%EB%A9%B4%20%EC%8B%A0%EC%B2%AD%ED%95%A9%EB%8B%88%EB%8B%A4%21',
    },
    {
        broadcaster: 'MBC',
        stationName: 'MBC FM4U',
        frequency: '91.9MHz',
        logo: '/radio-mbc-logo.png',
        smsLink: 'sms:%238000?body=%EA%B9%80%EC%84%B1%EA%B7%9C%EC%9D%98%20%EB%84%90%20%EB%96%A0%EC%98%AC%EB%A6%AC%EB%A9%B4%20%EC%8B%A0%EC%B2%AD%ED%95%A9%EB%8B%88%EB%8B%A4%21',
    },
    {
        broadcaster: 'KBS',
        stationName: 'KBS Cool FM',
        frequency: '89.1MHz',
        logo: '/radio-kbs-logo.png',
        smsLink: 'sms:%238910?body=%EA%B9%80%EC%84%B1%EA%B7%9C%EC%9D%98%20%EB%84%90%20%EB%96%A0%EC%98%AC%EB%A6%AC%EB%A9%B4%20%EC%8B%A0%EC%B2%AD%ED%95%A9%EB%8B%88%EB%8B%A4%21',
    },
];

// KBS Cool FM (89.1MHz) #8910
const KBS_SCHEDULE: RadioProgram[] = [
    { broadcaster: 'KBS', programName: '스테이션 제로', startHour: 0, endHour: 1, days: [1, 2, 3, 4, 5], highChance: true },
    { broadcaster: 'KBS', programName: '스테이션 제로', startHour: 0, endHour: 2, days: [0, 6], highChance: true },
    { broadcaster: 'KBS', programName: '상쾌한 아침', startHour: 5, endHour: 7, highChance: false },
    { broadcaster: 'KBS', programName: '조정식의 FM 대행진', startHour: 7, endHour: 9, highChance: false },
    { broadcaster: 'KBS', programName: '이현우의 음악앨범', startHour: 9, endHour: 11, highChance: false },
    { broadcaster: 'KBS', programName: '박명수의 라디오쇼', djNickname: '지팍', startHour: 11, endHour: 12, highChance: true },
    { broadcaster: 'KBS', programName: '이은지의 가요광장', djNickname: '텐디', startHour: 12, endHour: 14, highChance: true },
    { broadcaster: 'KBS', programName: '하하의 슈퍼라디오', note: '토, 일요일 신청곡 받음', startHour: 14, endHour: 16, highChance: true },
    { broadcaster: 'KBS', programName: '윤정수 남창희의 미스터 라디오', startHour: 16, endHour: 18, highChance: true },
    { broadcaster: 'KBS', programName: '사랑하기 좋은 날 이금희입니다', startHour: 18, endHour: 20, highChance: false },
    { broadcaster: 'KBS', programName: '오마이걸 효정의 볼륨을 높여요', djNickname: '쩡디', note: '금, 토, 일요일 신청곡 받음', startHour: 20, endHour: 22, highChance: true },
    { broadcaster: 'KBS', programName: '한해의 키스더라디오', djNickname: '샴디', note: '일요일 신청곡 받음', startHour: 22, endHour: 24, highChance: true },
];

// MBC FM4U (91.9MHz) #8000
const MBC_SCHEDULE: RadioProgram[] = [
    { broadcaster: 'MBC', programName: 'FM영화음악 김세윤입니다', startHour: 0, endHour: 1, highChance: false },
    { broadcaster: 'MBC', programName: '세상을 여는 아침, 이영은입니다', startHour: 6, endHour: 7, highChance: false },
    { broadcaster: 'MBC', programName: '굿모닝FM 테이입니다', djNickname: '테디', startHour: 7, endHour: 9, highChance: true },
    { broadcaster: 'MBC', programName: '오늘 아침 윤상입니다', djNickname: '상디', startHour: 9, endHour: 11, highChance: true },
    { broadcaster: 'MBC', programName: '안녕하세요 이문세입니다', startHour: 11, endHour: 12, highChance: false },
    { broadcaster: 'MBC', programName: '정오의 희망곡 김신영입니다', djNickname: '신디', startHour: 12, endHour: 14, highChance: true },
    { broadcaster: 'MBC', programName: '두시의 데이트 안영미입니다', startHour: 14, endHour: 16, highChance: true },
    { broadcaster: 'MBC', programName: '완벽한 하루 이상순입니다', djNickname: '순디', startHour: 16, endHour: 18, highChance: true },
    { broadcaster: 'MBC', programName: '배철수의 음악캠프', startHour: 18, endHour: 20, highChance: false },
    { broadcaster: 'MBC', programName: '김이나의 별이 빛나는 밤에', djNickname: '대장부엉', startHour: 20, endHour: 22, highChance: true },
    { broadcaster: 'MBC', programName: 'Holiday in 친한친구', startHour: 22, endHour: 24, highChance: true },
];

// SBS 파워FM (107.7MHz) #1077
const SBS_SCHEDULE: RadioProgram[] = [
    { broadcaster: 'SBS', programName: '애프터클럽', startHour: 1, endHour: 3, highChance: false },
    { broadcaster: 'SBS', programName: '파워 스테이션', startHour: 3, endHour: 5, highChance: false },
    { broadcaster: 'SBS', programName: '이인권의 펀펀투데이', startHour: 5, endHour: 7, highChance: false },
    { broadcaster: 'SBS', programName: '김영철의 파워FM', djNickname: '철업디', startHour: 7, endHour: 9, highChance: true },
    { broadcaster: 'SBS', programName: '아름다운 이 아침, 봉태규입니다', startHour: 9, endHour: 11, highChance: false },
    { broadcaster: 'SBS', programName: '박하선의 시네타운', startHour: 11, endHour: 12, highChance: false },
    { broadcaster: 'SBS', programName: '12시엔 주현영', djNickname: '주디', startHour: 12, endHour: 14, highChance: true },
    { broadcaster: 'SBS', programName: '두시탈출 컬투쇼', startHour: 14, endHour: 16, highChance: true },
    { broadcaster: 'SBS', programName: '황제성의 황제파워', djNickname: '퐝디', startHour: 16, endHour: 18, highChance: true },
    { broadcaster: 'SBS', programName: '박소현의 러브게임', djNickname: '라송', startHour: 18, endHour: 20, highChance: true },
    { broadcaster: 'SBS', programName: '웬디의 영스트리트', djNickname: '완디', startHour: 20, endHour: 22, highChance: true },
    { broadcaster: 'SBS', programName: '배성재의 텐', startHour: 22, endHour: 23, highChance: false },
    { broadcaster: 'SBS', programName: '딘딘의 Music High', startHour: 23, endHour: 24, highChance: true },
];

export const ALL_PROGRAMS: RadioProgram[] = [
    ...SBS_SCHEDULE,
    ...MBC_SCHEDULE,
    ...KBS_SCHEDULE,
];

export function getStationByBroadcaster(broadcaster: Broadcaster): RadioStation {
    return RADIO_STATIONS.find(s => s.broadcaster === broadcaster)!;
}

/**
 * 현재 KST 시간/요일에 방송 중인 프로그램 목록 반환
 * 방송국 순서: SBS → MBC → KBS (Figma 디자인 기준)
 */
export function getCurrentPrograms(kstHour: number, kstDayOfWeek: number): RadioProgram[] {
    return ALL_PROGRAMS.filter(program => {
        const endHour = program.endHour === 24 ? 24 : program.endHour;
        const isInTimeSlot = kstHour >= program.startHour && kstHour < endHour;
        if (!isInTimeSlot) return false;

        if (program.days) {
            return program.days.includes(kstDayOfWeek);
        }
        return true;
    });
}
