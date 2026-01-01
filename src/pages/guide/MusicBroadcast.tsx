import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import SubMenu from '../../components/SubMenu';

const MusicBroadcast = () => {
    const tabs = ['차트집계', '스케줄', '쇼챔피언', '엠카운트다운', '뮤직뱅크', '음악중심', '인기가요'];
    const [selectedTab, setSelectedTab] = useState(0);

    const guideMenus =  [
        { label: '아이디', path: '/guide/id-generation', disabled: false },
        { label: '스트리밍', path: '/guide/streaming', disabled: true },
        { label: '다운로드', path: '/guide/download', disabled: true },
        { label: '음악방송', path: '/guide/music-broadcast' },
        { label: '투표', path: '/guide/vote' },
        { label: '음악 나누기', path: '/guide/music-sharing', disabled: false },
        { label: 'MV', path: '/guide/mv', disabled: true },
        { label: '숏폼·SNS', path: '/guide/shorts-sns', disabled: true },
        { label: '라디오', path: '/guide/radio', disabled: true },
        { label: '컬러링', path: '/guide/coloring', disabled: true }
    ];

    return (
        <div className="app">
            <Header />
            <SubMenu menuItems={guideMenus} />
            <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
            <main className="main-content">
                {selectedTab === 0 && (
                    <img src={process.env.PUBLIC_URL + '/guide-music-chart.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/guide-vote-schedule.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 2 && (
                    <><img src={process.env.PUBLIC_URL + '/guide-show-champion.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-idolchamp.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
                {selectedTab === 3 && (
                    <img src={process.env.PUBLIC_URL + '/guide-m-countdown.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 4 && (
                    <><img src={process.env.PUBLIC_URL + '/guide-music-bank.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-fancast.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
                {selectedTab === 5 && (
                    <><img src={process.env.PUBLIC_URL + '/guide-music-core.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-mubeat.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
                {selectedTab === 6 && (
                    <><img src={process.env.PUBLIC_URL + '/guide-inkigayo.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-linc.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-higher.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default MusicBroadcast;
