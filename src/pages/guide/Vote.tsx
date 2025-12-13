import React, { useState } from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import GuideMenu from '../../components/GuideMenu';

const Vote = () => {
    const tabs = ['재화 모으기', '스케줄', '아이돌챔프', '엠넷플러스', '팬캐스트', '뮤빗', '링크'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <main className="main-content">
                <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
                {selectedTab === 0 && (
                    <img src={process.env.PUBLIC_URL + '/재화투표권모으기가이드.svg'} alt="guide" style={{ width: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Vote;
