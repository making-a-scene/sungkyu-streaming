import React from 'react';
import '../App.css';

// Notification Banner Component
const NotificationBanner: React.FC = () => {
    return (
        <div className="notification-banner">
            <img src={process.env.PUBLIC_URL + '/Announce Megaphone 1.svg'} alt="Notification" className="notification-icon" />
            <div className="notification-text">
                음총팀 카카오톡 채널을 추가하고 빠르게 소식을 받아보세요!
            </div>
            <a href="http://pf.kakao.com/_zfixgn" className="notification-link">바로가기</a>
            <button className="close-button">
                <img src={process.env.PUBLIC_URL + '/Close Icon (1) 1.svg'} alt="Close" className="close-icon" />
            </button>
        </div>
    );
};

export default NotificationBanner;