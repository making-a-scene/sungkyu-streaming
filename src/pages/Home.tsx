import React from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import YoutubeBanner from '../components/YoutubeBanner';
import ActionButtons from '../components/ActionButtons';
import AnnouncementSection from '../components/AnnouncementSection';
import StreamingPills from '../components/StreamingPills';
import StreamingCounter from '../components/StreamingCounter';
import GuideGrid from '../components/GuideGrid';
import RadioSchedule from '../components/RadioSchedule';

const Home = () => {
    return (
        <div className="app">
            <Header />
            <main className="home-content">
                <div className="home-top-group">
                    <YoutubeBanner youtubeSrc="https://www.youtube.com/embed/bK_1FZYO0pg" />
                    <div className="home-countdown-section">
                        <ActionButtons />
                    </div>
                </div>
                <div className="home-bottom-group">
                    <AnnouncementSection />
                    <StreamingPills />
                    <StreamingCounter releaseKST={new Date('2026-03-02T18:00:00+09:00')} songName="널 떠올리면" />
                    <RadioSchedule />
                    <div className="home-guide-section">
                        <h2 className="home-section-title">음원 총공 방법이 궁금하다면!</h2>
                        <div className="home-guide-content">
                            <GuideGrid />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
