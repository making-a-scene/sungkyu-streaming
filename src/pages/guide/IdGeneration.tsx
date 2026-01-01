import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import SubMenu from '../../components/SubMenu';

const IdGeneration = () => {
    const tabs = ['멜론', '지니', '벅스', '플로', '바이브', '듀얼 넘버'];
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
                    <img src={process.env.PUBLIC_URL + '/guide-melon.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/guide-genie.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 2 && (
                    <><img src={process.env.PUBLIC_URL + '/guide-bugs.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/guide-number.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
                {selectedTab === 3 && (
                    <img src={process.env.PUBLIC_URL + '/guide-flo.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 4 && (
                    <img src={process.env.PUBLIC_URL + '/guide-vibe.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 5 && (
                    <img src={process.env.PUBLIC_URL + '/guide-number.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 6 && (
                    <img src={process.env.PUBLIC_URL + '/guide-higher.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default IdGeneration;
