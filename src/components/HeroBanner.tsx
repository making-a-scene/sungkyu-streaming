import React from 'react';
import '../App.css';

const HeroBanner: React.FC = () => {
    return (
        <div className="hero-banner">
            <div className="hero-video-wrapper">
                <iframe
                    src="https://www.youtube.com/embed/AdOaQpwYx0c?si=a6j3BAkqFcZ5AKU9"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default HeroBanner;
