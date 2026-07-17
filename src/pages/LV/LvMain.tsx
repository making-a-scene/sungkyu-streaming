import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageTitle from "../../components/PageTitle";
import TweetEmbedList from "../../components/TweetEmbedList";
import '../../App.css';

const CONCERT_TABS = ["첫콘(7/18)", "막콘(7/19)"] as const;
type ConcertTab = typeof CONCERT_TABS[number];

function rotateByKSTHour<T>(arr: T[]): T[] {
    if (arr.length === 0) return arr;
    const now = new Date();
    const kstHour = (now.getUTCHours() + 9) % 24;
    const offset = kstHour % arr.length;
    return [...arr.slice(offset), ...arr.slice(0, offset)];
}

const GIVEAWAY_TWEETS: Record<ConcertTab, string[]> = {
    "첫콘(7/18)": [
        "2077029958569070706",
        "2077022620994900106",
        "2074712394279030836",
        "2077777793212092677",
        "2077615537954390119",
        "2075477445776658525",
        "2075235478480335299",
    ],
    "막콘(7/19)": [
        "2075235478480335299",
        "2075477445776658525",
        "2074712394279030836",
        "2075195019947065362",
        "2069075400144331147",
        "2077615537954390119",
        "2077777793212092677",
        "2077672049930326254",
        "2074772828893905204",
        "2074712394279030836",
        "2077022620994900106",
    ],
};

const LvMain = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<ConcertTab>("첫콘(7/18)");

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
                                <span className="lv-card-coming-soon">2026.07.18</span>
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
