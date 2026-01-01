import React, {useState} from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TabView from '../../components/TabView';
import GuideMenu from '../../components/GuideMenu';

const IdGeneration = () => {
    const tabs = ['멜론', '지니', '벅스', '플로', '바이브', '듀얼 넘버'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
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
