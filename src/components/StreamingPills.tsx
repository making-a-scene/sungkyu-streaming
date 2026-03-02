import React from 'react';
import { toast } from 'react-toastify';
import '../App.css';

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
            android: `melonapp://play?ctype=1&menuid=0&cid=601405270,601332981,601405271,601405272,601405270,601405273,3964349,601405274,601405270,601332981,601405272,601405271,601405270,601332981,601405273,601405271`,
            ios: `melonapp://play/?ctype=1&menuid=0&cid=601405270,601332981,601405271,601405272,601405270,601405273,3964349,601405274,601405270,601332981,601405272,601405271,601405270,601332981,601405273,601405271`,
            ipad: `melonipad://play/?ctype=1&menuid=0&cid=601405270,601332981,601405271,601405272,601405270,601405273,3964349,601405274,601405270,601332981,601405272,601405271,601405270,601332981,601405273,601405271`,
            windows: `melonapp://play?cType=1&menuId=0&cList=601405270,601332981,601405271,601405272,601405270,601405273,3964349,601405274,601405270,601332981,601405272,601405271,601405270,601332981,601405273,601405271`,
            mac: `melonplayer://play?menuid=0&cflag=1&cid=601405270,601332981,601405271,601405272,601405270,601405273,3964349,601405274,601405270,601332981,601405272,601405271,601405270,601332981,601405273,601405271`
        }
    },
    {
        name: '지니',
        icon: '/assets/d6b1c5cb4ff44286079e79d7ad0682bd8ed1f357.png',
        links: {
            android: `cromegenie://scan/?landing_type=31&landing_target=114076673;113971444;114076674;114076675;114076673;114076676;81626995;114076677;114076673;113971444;114076675;114076674;114076673;113971444;114076676;114076674`,
            ios: `ktolleh00167://landing/?landing_type=31&landing_target=114076673;113971444;114076674;114076675;114076673;114076676;81626995;114076677;114076673;113971444;114076675;114076674;114076673;113971444;114076676;114076674`,
            ipad: `ktolleh00167://landing/?landing_type=31&landing_target=114076673;113971444;114076674;114076675;114076673;114076676;81626995;114076677;114076673;113971444;114076675;114076674;114076673;113971444;114076676;114076674`,
            windows: `https://www.genie.co.kr/player/shareProcessV2?xgnm=114076673;113971444;114076674;114076675;114076673;114076676;81626995;114076677;114076673;113971444;114076675;114076674;114076673;113971444;114076676;114076674`,
            mac: `https://www.genie.co.kr/player/shareProcessV2?xgnm=114076673;113971444;114076674;114076675;114076673;114076676;81626995;114076677;114076673;113971444;114076675;114076674;114076673;113971444;114076676;114076674`,
        },
    },
    {
        name: '벅스',
        icon: '/assets/f7b71e5a8c6270a1b988ea59fa800e1a12dcf81d.png',
        links: {
            android: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=6432119|6426606|6432120|6432121|6432119|6432122|2815212|6432123|6432119|6426606|6432121|6432120|6432119|6426606|6432122|6432120`,
            ios: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=6432119|6426606|6432120|6432121|6432119|6432122|2815212|6432123|6432119|6426606|6432121|6432120|6432119|6426606|6432122|6432120`,
            ipad: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=6432119|6426606|6432120|6432121|6432119|6432122|2815212|6432123|6432119|6426606|6432121|6432120|6432119|6426606|6432122|6432120`,
            windows: `https://music.bugs.co.kr/newPlayer?trackId=6432119,6426606,6432120,6432121,6432119,6432122,2815212,6432123,6432119,6426606,6432121,6432120,6432119,6426606,6432122,6432120`,
            mac: `https://music.bugs.co.kr/newPlayer?trackId=6432119,6426606,6432120,6432121,6432119,6432122,2815212,6432123,6432119,6426606,6432121,6432120,6432119,6426606,6432122,6432120`
        },
    },
    {
        name: '플로',
        icon: '/assets/661c8273b064e8efd3a9aa68a0a26e191cb6c129.png',
        links: {
            android: `flomusic://play/track?ids=577224475,576129937,577224476,577224477,577224475,577224478,2815212,577224479,577224475,576129937,577224477,577224476,577224475,576129937,577224478,577224476`,
            ios: `flomusic://play/track?ids=577224475,576129937,577224476,577224477,577224475,577224478,2815212,577224479,577224475,576129937,577224477,577224476,577224475,576129937,577224478,577224476`,
            ipad: `flomusic://play/track?ids=577224475,576129937,577224476,577224477,577224475,577224478,2815212,577224479,577224475,576129937,577224477,577224476,577224475,576129937,577224478,577224476`,
            windows: null,
            mac: null,
        },
    },
    {
        name: '바이브',
        icon: '/assets/eba6020c5e645ff8c96da96b2367bb65f6a57e25.png',
        links: {
            android: `vibe://listen?version=3&trackIds=101375599,100900428,101375600,101375601,101375602,3361722,101375603`,
            ios: `vibe://listen?version=3&trackIds=101375599,100900428,101375600,101375601,101375602,3361722,101375603`,
            ipad: `vibe://listen?version=3&trackIds=101375599,100900428,101375600,101375601,101375602,3361722,101375603`,
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
