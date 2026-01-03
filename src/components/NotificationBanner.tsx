import React from 'react';
import '../App.css';
import {useNavigate} from "react-router-dom";

// Notification Banner Component
const NotificationBanner: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="notification-banner" onClick={() => navigate('/guide/mv')}>
            <img src={process.env.PUBLIC_URL + '/mv-icon.svg'} alt="Notification" className="notification-icon" />
            <div className="notification-text">
                MV 스트리밍 가이드
            </div>
            <button className="move-button">
                <img className="move-icon" src={process.env.PUBLIC_URL + '/arrow-icon.svg'} alt="Move" />
            </button>
        </div>
    );
};

export default NotificationBanner;