import React from 'react';
import '../App.css';

const PLATFORMS = [
    { name: '멜론', icon: '/assets/b8af7c06789987325e94b2ffdf106371ee381a1f.png' },
    { name: '지니', icon: '/assets/d6b1c5cb4ff44286079e79d7ad0682bd8ed1f357.png' },
    { name: '벅스', icon: '/assets/f7b71e5a8c6270a1b988ea59fa800e1a12dcf81d.png' },
    { name: '플로', icon: '/assets/661c8273b064e8efd3a9aa68a0a26e191cb6c129.png' },
    { name: '바이브', icon: '/assets/eba6020c5e645ff8c96da96b2367bb65f6a57e25.png' },
];

const StreamingPills: React.FC = () => {
    return (
        <div className="streaming-pills-section">
            <h2 className="home-section-title">원클릭 스밍리스트</h2>
            <div className="streaming-pills-container">
                {PLATFORMS.map((platform) => (
                    <div key={platform.name} className="streaming-pill">
                        <img
                            src={process.env.PUBLIC_URL + platform.icon}
                            alt={platform.name}
                            className="streaming-pill-icon"
                        />
                        <span className="streaming-pill-text">{platform.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StreamingPills;
