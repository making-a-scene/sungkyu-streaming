import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import SubMenu from '../../components/SubMenu';

const ShortsSns = () => {
    const tabs = ['틱톡 TikTok', '유튜브 Shorts', '인스타그램 Reels'];
    const [selectedTab, setSelectedTab] = useState(0);

    const guideMenus =  [
        { label: '아이디', path: '/guide/id-generation', disabled: false },
        { label: '스트리밍', path: '/guide/streaming', disabled: true },
        { label: '다운로드', path: '/guide/download', disabled: true },
        { label: '음악방송', path: '/guide/music-broadcast' },
        { label: '투표', path: '/guide/vote' },
        { label: '음악 나누기', path: '/guide/music-sharing', disabled: false },
        { label: 'MV', path: '/guide/mv', disabled: false },
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
                    <img src={process.env.PUBLIC_URL + '/guide-tiktok.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/guide-shorts.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 2 && (
                    <img src={process.env.PUBLIC_URL + '/guide-reels.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default ShortsSns;
