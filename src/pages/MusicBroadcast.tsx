import React from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import TabView from '../components/TabView';

const MusicBroadcast = () => {
    const tabs = ['차트집계', '스케줄', '쇼챔피언', '엠카운트다운', '뮤직뱅크', '음악중심', '인기가요'];

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="page-title-text" style={{ marginBottom: '24px' }}>음악방송 가이드</div>
                <TabView tabs={tabs} defaultTab={0} />
            </main>
            <Footer />
        </div>
    );
}

export default MusicBroadcast;
