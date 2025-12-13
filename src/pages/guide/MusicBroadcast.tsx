import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import GuideMenu from '../../components/GuideMenu';

const MusicBroadcast = () => {
    const tabs = ['차트집계', '스케줄', '쇼챔피언', '엠카운트다운', '뮤직뱅크', '음악중심', '인기가요'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
            <main className="main-content">
                {selectedTab === 0 && (
                    <img src={process.env.PUBLIC_URL + '/최종_차트집계.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/최종_투표스케줄.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 3 && (
                    <img src={process.env.PUBLIC_URL + '/최종_엠카운트다운.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 4 && (
                    <img src={process.env.PUBLIC_URL + '/최종_뮤직뱅크.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 5 && (
                    <img src={process.env.PUBLIC_URL + '/최종_음악중심.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 6 && (
                    <img src={process.env.PUBLIC_URL + '/최종_인기가요.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default MusicBroadcast;
