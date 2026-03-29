import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageTitle from '../../components/PageTitle';
import LanguageSelector from '../../components/LanguageSelector';
import '../../App.css';

interface LvFanEventProps {
    currentPath: string;
    guideTitle: string;
    eventImage: string;
}

const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/kCqu84_wWJo';

const LvFanEvent: React.FC<LvFanEventProps> = ({ currentPath, guideTitle, eventImage }) => {
    return (
        <div className="app">
            <Header />
            <PageTitle icon="/lv4-icon-filled.svg" title="LV4" />
            <main className="main-content lv-fan-event-main">
                <LanguageSelector currentPath={currentPath} />
                <div className="fan-event-container">
                    <img
                        src={eventImage}
                        alt="Fan Event Info"
                        className="fan-event-image"
                    />
                    <div className="fan-event-guide">
                        <h2 className="fan-event-guide-title">{guideTitle}</h2>
                        <div className="fan-event-video-wrapper">
                            <iframe
                                src={YOUTUBE_EMBED_URL}
                                title="Fan Event Guide Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="fan-event-video"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LvFanEvent;
