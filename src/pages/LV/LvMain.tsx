import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import TweetEmbedList from "../../components/TweetEmbedList";
import '../../App.css';

const CONCERT_TABS = ["첫콘(3/27)", "중콘(3/28)", "막콘(3/29)"] as const;
type ConcertTab = typeof CONCERT_TABS[number];

function rotateByKSTHour<T>(arr: T[]): T[] {
    if (arr.length === 0) return arr;
    const now = new Date();
    const kstHour = (now.getUTCHours() + 9) % 24;
    const offset = kstHour % arr.length;
    return [...arr.slice(offset), ...arr.slice(0, offset)];
}

const GIVEAWAY_TWEETS: Record<ConcertTab, string[]> = {
    "첫콘(3/27)": [
        "2034580124218396851",
        "2034225137130865077",
        "2029502793455919122",
        "2034054978638356833",
        "2033928527717003768",
        "2033904948900204842",
        "2033879804228051315",
        "2027316361404592136",
        "2034239836027281534",
        "2029435329665744907",
        "2035637799748247577",
        "2035717167573082357",
        "2029806952348537049",
        "2036790586699927705",
        "2030997365935751652",
        "2037114789684707698",
        "2037209245020803404",
        "2037161920449700091",
        "2037350478544269662"
    ],
    "중콘(3/28)": [
        "2034234511148630431",
        "2034225137130865077",
        "2029502793455919122",
        "2034054978638356833",
        "2029718625247215707",
        "2034239836027281534",
        "2033762258380333098",
        "2035683385109283113",
        "2035637799748247577",
        "2035911361763696803",
        "2036042291333476793",
        "2035717167573082357",
        "2036986633233608822",
        "2029806952348537049",
        "2032435531494375876",
        "2037114789684707698",
        "2037187092191862847",
        "2036384486225834354",
        "2037350478544269662"
    ],
    "막콘(3/29)": [
        "2034961341556171266",
        "2034669094642049485",
        "2034506273467867198",
        "2034246901374279988",
        "2034234511148630431",
        "2034225137130865077",
        "2029502793455919122",
        "2026890301076594934",
        "2033879804228051315",
        "2032365702204854272",
        "2027316361404592136",
        "2032358110757863940",
        "2034239836027281534",
        "2033762258380333098",
        "2029469412399681848",
        "2030978521364103244",
        "2035724497224094022",
        "2035637799748247577",
        "2035882157034647619",
        "2035717167573082357",
        "2029806952348537049",
        "2030997365935751652",
        "2037321638765867452",
        "2037350478544269662"
    ],
};

const LvMain = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ConcertTab>("막콘(3/29)");

    return (
        <div className="app">
            <Header />
            <PageTitle icon="/lv4-icon-filled.svg" title="LV4" />
            <main className="main-content lv-main">
                <div className="lv-top-row">
                    <div className="lv-card" onClick={() => navigate('/lv4-ko')}>
                        <div className="lv-card-content">
                            <div className="lv-card-text">
                                <span className="lv-card-title">팬 이벤트</span>
                                <span className="lv-card-subtitle">Fan Event</span>
                            </div>
                            <div className="lv-card-footer">
                                <span className="lv-card-coming-soon">2026.03.28</span>
                                <img src="/arrow-icon.svg" alt="" className="lv-card-arrow" />
                            </div>
                        </div>
                    </div>
                    <div className="lv-card" onClick={() => navigate('/guide/cheering')}>
                        <div className="lv-card-content">
                            <div className="lv-card-text">
                                <span className="lv-card-title">응원법·떼창곡</span>
                                <span className="lv-card-subtitle">Fan Chant</span>
                            </div>
                            <div className="lv-card-footer lv-card-footer-end">
                                <img src="/arrow-icon.svg" alt="" className="lv-card-arrow" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lv-giveaway-section">
                    <div className="lv-section-header">
                        <span className="lv-section-title">나눔</span>
                        <span className="lv-section-subtitle">Giveaways</span>
                    </div>
                    <div className="event-filter-bar">
                        {CONCERT_TABS.map((tab) => (
                            <div
                                key={tab}
                                className={`event-filter-pill ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                    <TweetEmbedList
                        key={activeTab}
                        tweetIds={rotateByKSTHour(GIVEAWAY_TWEETS[activeTab])}
                        pageSize={3}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default LvMain;
