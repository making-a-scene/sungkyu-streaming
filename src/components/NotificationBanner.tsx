import React, { useState } from 'react';
import '../App.css';

// Notification Banner Component
const NotificationBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="notification-banner">
            <img src={process.env.PUBLIC_URL + '/확성기.svg'} alt="Notification" className="notification-icon" />
            <div className="notification-text">
                음총팀 X(트위터) 계정을 팔로우하고 빠르게 소식을 받아보세요!
            </div>
            <a href="https://x.com/sungkyustream" className="notification-link" target="_blank" rel="noreferrer">바로가기</a>
            <button className="close-button" onClick={handleClose}>
                <img src={process.env.PUBLIC_URL + '/Close Icon.svg'} alt="Close" className="close-icon" />
            </button>
        </div>
    );
};

export default NotificationBanner;