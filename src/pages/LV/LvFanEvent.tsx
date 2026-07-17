import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageTitle from '../../components/PageTitle';
import LanguageSelector from '../../components/LanguageSelector';
import '../../App.css';

interface LvFanEventProps {
    currentPath: string;
    songGuideTitle: string;
    sloganGuideTitle: string;
    eventImage: string;
}

const SONG_YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/lS3xMPeT8gc';
const SLOGAN_YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/aptr8cU0hGY';

const LvFanEvent: React.FC<LvFanEventProps> = ({ currentPath, songGuideTitle, sloganGuideTitle, eventImage }) => {
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
                        <h2 className="fan-event-guide-title">{songGuideTitle}</h2>
                        <div className="fan-event-video-wrapper">
                            <iframe
                                src={SONG_YOUTUBE_EMBED_URL}
                                title="Song Fan Event Guide Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="fan-event-video"
                            />
                        </div>
                    </div>
                    <div className="fan-event-guide">
                        <h2 className="fan-event-guide-title">{sloganGuideTitle}</h2>
                        <div className="fan-event-video-wrapper">
                            <iframe
                                src={SLOGAN_YOUTUBE_EMBED_URL}
                                title="Slogan Fan Event Guide Video"
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
