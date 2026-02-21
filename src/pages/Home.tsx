import React from 'react';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import CountdownTimer from '../components/CountdownTimer';
import ActionButtons from '../components/ActionButtons';
import AnnouncementSection from '../components/AnnouncementSection';
import StreamingPills from '../components/StreamingPills';
import GuideGrid from '../components/GuideGrid';
import CheeringGuideBanner from '../components/CheeringGuideBanner';

const Home = () => {
    return (
        <div className="app">
            <Header />
            <main className="home-content">
                <div className="home-top-group">
                    <HeroBanner />
                    <div className="home-countdown-section">
                        <CountdownTimer />
                        <ActionButtons />
                    </div>
                </div>
                <div className="home-bottom-group">
                    <AnnouncementSection />
                    <StreamingPills />
                    <div className="home-guide-section">
                        <h2 className="home-section-title">음원 총공 방법이 궁금하다면!</h2>
                        <div className="home-guide-content">
                            <GuideGrid />
                            <CheeringGuideBanner />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
