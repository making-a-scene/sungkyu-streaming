import React from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import TabView from '../components/TabView';
// import NotificationBanner from '../components/NotificationBanner';

interface MusicBroadcastProps {
    onNavigate?: (page: string) => void;
}

const MusicBroadcast: React.FC<MusicBroadcastProps> = ({ onNavigate }) => {
    const tabs = ['차트집계', '스케줄', '쇼챔피언', '엠카운트다운', '뮤직뱅크', '음악중심', '인기가요'];

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                {/*<NotificationBanner />*/}
                <div className="page-title-text" style={{ marginBottom: '24px' }}>음악방송 가이드</div>
                <TabView tabs={tabs} defaultTab={0} />
                <img src={process.env.PUBLIC_URL + '/재화투표권모으기가이드.svg'} alt="guide" style={{ width: '880px', display: 'block' }} />
            </main>
            <Footer />
        </div>
    );
}

export default MusicBroadcast;
