import React from 'react';
import '../App.css';

interface YoutubeBannerProps {
    youtubeSrc: string;
}
const YoutubeBanner: React.FC<YoutubeBannerProps> = ({youtubeSrc}) => {
    return (
        <div className="hero-banner">
            <div className="hero-video-wrapper">
                <iframe
                    src={youtubeSrc}
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

export default YoutubeBanner;
