import React from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import GuideMenu from '../../components/GuideMenu';

const MusicBroadcast = () => {
    const tabs = ['차트집계', '스케줄', '쇼챔피언', '엠카운트다운', '뮤직뱅크', '음악중심', '인기가요'];

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <main className="main-content">
                <TabView tabs={tabs} defaultTab={0} />
            </main>
            <Footer />
        </div>
    );
}

export default MusicBroadcast;
