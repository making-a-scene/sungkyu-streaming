import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../App.css';
import SocialIcons from "./SocialIcons";

// Header Component
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';
    const isGuide = location.pathname.startsWith('/guide');
    const isChart = location.pathname.startsWith('/chart');

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={process.env.PUBLIC_URL + '/main-logo.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="header-menu">
                <div className={`header-menu-item ${isHome ? 'active' : ''}`} onClick={() => navigate('/')}>
                    <img src={process.env.PUBLIC_URL + '/home-icon.svg'} alt="Home" className="header-menu-icon"/>
                    <span className="header-menu-text">홈</span>
                </div>
                <div className={`header-menu-item ${isGuide ? 'active' : 'inactive'}`}>
                    <img src={process.env.PUBLIC_URL + '/guide-icon.svg'} alt="Guide" className="header-menu-icon"/>
                    <span className="header-menu-text">가이드</span>
                    {!isGuide && <span className="tooltip-text">준비중</span>}
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/schedule-icon.svg'} alt="Schedule" className="header-menu-icon"/>
                    <span className="header-menu-text">스케줄</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className={`header-menu-item ${isChart ? 'active' : 'inactive'}`} onClick={() => navigate('/chart/mv')}>
                    <img src={process.env.PUBLIC_URL + '/chart-icon.svg'} alt="Chart" className="header-menu-icon"/>
                    <span className="header-menu-text">차트</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/apply-icon.svg'} alt="Apply" className="header-menu-icon"/>
                    <span className="header-menu-text">지원하기</span>
                    <span className="tooltip-text">준비중</span>
                </div>
            </div>
            <div className="header-social-icons">
                <SocialIcons/>
            </div>
        </header>
    );
};

export default Header;