import React from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import SocialIcons from "./SocialIcons";

// Header Component
const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="header-menu">
                <div className="header-menu-item active" onClick={() => navigate('/')}>
                    <img src={process.env.PUBLIC_URL + '/홈.svg'} alt="Home" className="header-menu-icon"/>
                    <span className="header-menu-text">홈</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/가이드.svg'} alt="Guide" className="header-menu-icon"/>
                    <span className="header-menu-text">가이드</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/스케줄.svg'} alt="Schedule" className="header-menu-icon"/>
                    <span className="header-menu-text">스케줄</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/차트.svg'} alt="Chart" className="header-menu-icon"/>
                    <span className="header-menu-text">차트</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '/지원하기.svg'} alt="Apply" className="header-menu-icon"/>
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