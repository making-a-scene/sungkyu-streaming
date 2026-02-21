import React, {useState} from "react";
import Header from "../../components/Header";
import GuideMenu from "../../components/GuideMenu";
import Footer from "../../components/Footer";
import TabView from "../../components/TabView";

const Download = () => {
    const tabs = ['멜론', '지니', '벅스', '카카오뮤직', '멜론 MV 다운로드', '벅스 MV 다운로드'];
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <TabView tabs={tabs} defaultTab={0} onTabChange={setSelectedTab} />
            <main className="main-content">
                {selectedTab === 0 && (
                    <><img src={process.env.PUBLIC_URL + '/melon-download-guide.png'} alt="guide"
                           style={{width: '100%', maxWidth: '880px', display: 'block'}}/><img
                        src={process.env.PUBLIC_URL + '/melon-cash-charge-guide.png'} alt="guide"
                        style={{width: '100%', maxWidth: '880px', display: 'block'}}/></>
                )}
                {selectedTab === 1 && (
                    <img src={process.env.PUBLIC_URL + '/genie-download-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 2 && (
                    <img src={process.env.PUBLIC_URL + '/bugs-music-download-guide.png'} alt="guide" style={{width: '100%', maxWidth: '880px', display: 'block'}}/>
                )}
                {selectedTab === 3 && (
                    <img src={process.env.PUBLIC_URL + '/kakaomusic-download-guide.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
                )}
                {selectedTab === 4 && (
                    <img src={process.env.PUBLIC_URL + '/melon-mv-download-guide.png'} alt="guide" style={{width: '100%', maxWidth: '880px', display: 'block'}}/>
                )}
                {selectedTab === 5 && (
                    <img src={process.env.PUBLIC_URL + '/bugs-mv-download-guide.png'} alt="guide" style={{width: '100%', maxWidth: '880px', display: 'block'}}/>
                )}
            </main>
            <Footer />
        </div>
    );
}
export default Download;