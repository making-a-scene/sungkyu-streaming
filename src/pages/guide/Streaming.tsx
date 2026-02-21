import React, {useState} from "react";
import Header from "../../components/Header";
import GuideMenu from "../../components/GuideMenu";
import Footer from "../../components/Footer";
import TabView from "../../components/TabView";

const Streaming = () => {
    const tabs = ['멜론', '멜론 뮤직웨이브', '지니', '벅스', '플로', '바이브'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
            <main className="main-content">
                {selectedTab === 0 && (
                    <img src={process.env.PUBLIC_URL + '/melon-streaming-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/melon-music-wave-guide.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/>
                )}
                {selectedTab === 2 && (
                    <img src={process.env.PUBLIC_URL + '/genie-streaming-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}

                {selectedTab === 3 && (
                    <img src={process.env.PUBLIC_URL + '/bugs-streaming-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 4 && (
                    <img src={process.env.PUBLIC_URL + '/flo-streaming-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 5 && (
                    <img src={process.env.PUBLIC_URL + '/vibe-streaming-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Streaming;