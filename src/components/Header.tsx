import React from 'react';
import '../App.css';
import SocialIcons from "./SocialIcons";

interface HeaderProps {
    onNavigate?: (page: string) => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const handleLogoClick = () => {
        if (onNavigate) {
            onNavigate('home');
        }
    };

    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}>
                <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="header-menu">
                <div className="header-menu-item active">
                    <img src={process.env.PUBLIC_URL + '홈.svg'} alt="Home" className="header-menu-icon"/>
                    <span className="header-menu-text">홈</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '가이드.svg'} alt="Guide" className="header-menu-icon"/>
                    <span className="header-menu-text">가이드</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '스케줄.svg'} alt="Schedule" className="header-menu-icon"/>
                    <span className="header-menu-text">스케줄</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '차트.svg'} alt="Chart" className="header-menu-icon"/>
                    <span className="header-menu-text">차트</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '지원하기.svg'} alt="Apply" className="header-menu-icon"/>
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