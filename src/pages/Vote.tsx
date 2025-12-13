import React from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import TabView from '../components/TabView';
// import NotificationBanner from '../components/NotificationBanner';

interface Vote {
    onNavigate?: (page: string) => void;
}

const Vote = () => {
    const tabs = ['재화 모으기', '스케줄', '아이돌챔프', '엠넷플러스', '팬캐스트', '뮤빗', '링크'];

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                {/*<NotificationBanner />*/}
                <div className="page-title-text" style={{ marginBottom: '24px' }}>투표 가이드</div>
                <TabView tabs={tabs} defaultTab={0} />
                <img src={process.env.PUBLIC_URL + '/재화투표권모으기가이드.svg'} alt="guide" style={{ width: '880px', display: 'block' }} />
            </main>
            <Footer />
        </div>
    );
}

export default Vote;
