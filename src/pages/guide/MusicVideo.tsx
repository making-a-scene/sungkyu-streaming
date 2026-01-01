import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GuideMenu from '../../components/GuideMenu';
import TabView from "../../components/TabView";

const MusicVideo = () => {
    const tabs = ['MV 스트리밍', '멜론 MV 다운로드', '벅스 MV 다운로드'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
            <main className="main-content">
                {selectedTab === 0 && (
                    <img src={process.env.PUBLIC_URL + '/guide-youtube-strm.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default MusicVideo;
