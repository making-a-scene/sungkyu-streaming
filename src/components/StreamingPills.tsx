import React from 'react';
import { toast } from 'react-toastify';
import '../App.css';

// TODO: 공개 후 실제 곡 ID로 교체
const overIt_melon = '3964349';
const overIt_genie = '81626995';
const overIt_bugs = '2815212';
const overIt_flo = '2815212';
const overIt_vibe = '3361722';

type DeviceType = 'android' | 'ios' | 'ipad' | 'windows' | 'mac';

const getDeviceType = (): DeviceType => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return 'android';
    if (/iPhone|iPod/i.test(ua)) return 'ios';
    // iPadOS 13+는 Macintosh로 표시되지만 터치스크린이 있음
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return 'ipad';
    if (/Macintosh/i.test(ua)) return 'mac';
    return 'windows';
};

const PLATFORMS = [
    {
        name: '멜론',
        icon: '/assets/b8af7c06789987325e94b2ffdf106371ee381a1f.png',
        links: {
            android: `melonapp://play?ctype=1&menuid=0&cid=${overIt_melon},3964349,5690596,5690598,30917488,37174657,33136332,36573055,5690599`,
            ios: `melonapp://play/?ctype=1&menuid=0&cid=${overIt_melon},3964349,5690596,5690598,${overIt_melon},30917488,37174657,3964349,${overIt_melon},33136332,5690596,36573055,${overIt_melon},3964349,5690599,30917488`,
            ipad: `melonipad://play/?ctype=1&menuid=0&cid=${overIt_melon},3964349,5690596,5690598,${overIt_melon},30917488,37174657,3964349,${overIt_melon},33136332,5690596,36573055,${overIt_melon},3964349,5690599,30917488`,
            windows: `melonapp://play?cType=1&menuId=0&cList=${overIt_melon},3964349,5690596,5690598,${overIt_melon},30917488,37174657,3964349,${overIt_melon},33136332,5690596,36573055,${overIt_melon},3964349,5690599,30917488`,
            mac: `melonplayer://play?menuid=0&cflag=1&cid=${overIt_melon},3964349,5690596,5690598,${overIt_melon},30917488,37174657,3964349,${overIt_melon},33136332,5690596,36573055,${overIt_melon},3964349,5690599,30917488`,
        },
    },
    {
        name: '지니',
        icon: '/assets/d6b1c5cb4ff44286079e79d7ad0682bd8ed1f357.png',
        links: {
            android: `cromegenie://scan/?landing_type=31&landing_target=${overIt_genie};81626995;84015417;84015419;${overIt_genie};87789346;105384302;81626995;${overIt_genie};91635253;84015417;102406372;${overIt_genie};81626995;84015420;87789346`,
            ios: `ktolleh00167://landing/?landing_type=31&landing_target=${overIt_genie};81626995;84015417;84015419;${overIt_genie};87789346;105384302;81626995;${overIt_genie};91635253;84015417;102406372;${overIt_genie};81626995;84015420;87789346`,
            ipad: `ktolleh00167://landing/?landing_type=31&landing_target=${overIt_genie};81626995;84015417;84015419;${overIt_genie};87789346;105384302;81626995;${overIt_genie};91635253;84015417;102406372;${overIt_genie};81626995;84015420;87789346`,
            windows: `https://www.genie.co.kr/player/shareProcessV2?xgnm=${overIt_genie};81626995;84015417;84015419;${overIt_genie};87789346;105384302;81626995;${overIt_genie};91635253;84015417;102406372;${overIt_genie};81626995;84015420;87789346`,
            mac: `https://www.genie.co.kr/player/shareProcessV2?xgnm=${overIt_genie};81626995;84015417;84015419;${overIt_genie};87789346;105384302;81626995;${overIt_genie};91635253;84015417;102406372;${overIt_genie};81626995;84015420;87789346`,
        },
    },
    {
        name: '벅스',
        icon: '/assets/f7b71e5a8c6270a1b988ea59fa800e1a12dcf81d.png',
        links: {
            android: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=${overIt_bugs}|2815212|4332864|4332866|${overIt_bugs}|30964978|6232052|2815212|${overIt_bugs}|6033773|4332864|6204397|${overIt_bugs}|2815212|4332867|30964978`,
            ios: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=${overIt_bugs}|2815212|4332864|4332866|${overIt_bugs}|30964978|6232052|2815212|${overIt_bugs}|6033773|4332864|6204397|${overIt_bugs}|2815212|4332867|30964978`,
            ipad: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=${overIt_bugs}|2815212|4332864|4332866|${overIt_bugs}|30964978|6232052|2815212|${overIt_bugs}|6033773|4332864|6204397|${overIt_bugs}|2815212|4332867|30964978`,
            windows: `https://music.bugs.co.kr/newPlayer?trackId=${overIt_bugs},2815212,4332864,4332866,${overIt_bugs},30964978,6232052,2815212,${overIt_bugs},6033773,4332864,6204397,${overIt_bugs},2815212,4332867,30964978`,
            mac: `https://music.bugs.co.kr/newPlayer?trackId=${overIt_bugs},2815212,4332864,4332866,${overIt_bugs},30964978,6232052,2815212,${overIt_bugs},6033773,4332864,6204397,${overIt_bugs},2815212,4332867,30964978`,
        },
    },
    {
        name: '플로',
        icon: '/assets/661c8273b064e8efd3a9aa68a0a26e191cb6c129.png',
        links: {
            android: `flomusic://play/track?ids=${overIt_flo},2815212,4332864,4332866,${overIt_flo},30964978,494763955,2815212,${overIt_flo},441650054,4332864,477039425,${overIt_flo},2815212,4332867,30964978`,
            ios: `flomusic://play/track?ids=${overIt_flo},2815212,4332864,4332866,${overIt_flo},30964978,494763955,2815212,${overIt_flo},441650054,4332864,477039425,${overIt_flo},2815212,4332867,30964978`,
            ipad: `flomusic://play/track?ids=${overIt_flo},2815212,4332864,4332866,${overIt_flo},30964978,494763955,2815212,${overIt_flo},441650054,4332864,477039425,${overIt_flo},2815212,4332867,30964978`,
            windows: null,
            mac: null,
        },
    },
    {
        name: '바이브',
        icon: '/assets/eba6020c5e645ff8c96da96b2367bb65f6a57e25.png',
        links: {
            android: `vibe://listen?version=3&trackIds=${overIt_vibe},3361722,5251972,5251969,20631248,82888984,43705378,65603274,5251971`,
            ios: `vibe://listen?version=3&trackIds=${overIt_vibe},3361722,5251972,5251969,20631248,82888984,43705378,65603274,5251971`,
            ipad: `vibe://listen?version=3&trackIds=${overIt_vibe},3361722,5251972,5251969,20631248,82888984,43705378,65603274,5251971`,
            windows: null,
            mac: null,
        },
    },
];

const StreamingPills: React.FC = () => {
    const handleClick = (platform: typeof PLATFORMS[number]) => {
        const device = getDeviceType();
        const link = platform.links[device];

        if (!link) {
            toast.error(`${platform.name}는 현재 기기에서 지원하지 않습니다.`, {
                autoClose: 1500,
                hideProgressBar: true,
            });
            return;
        }

        window.location.href = link;
    };

    return (
        <div className="streaming-pills-section">
            <h2 className="home-section-title">원클릭 스밍리스트</h2>
            <div className="streaming-pills-container">
                {PLATFORMS.map((platform) => (
                    <div
                        key={platform.name}
                        className="streaming-pill"
                        onClick={() => handleClick(platform)}
                    >
                        <img
                            src={process.env.PUBLIC_URL + platform.icon}
                            alt={platform.name}
                            className="streaming-pill-icon"
                        />
                        <span className="streaming-pill-text">{platform.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StreamingPills;
