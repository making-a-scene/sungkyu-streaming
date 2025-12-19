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

            </main>
            <Footer />
        </div>
    );
}

export default IdGeneration;
