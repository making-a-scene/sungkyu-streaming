import React from 'react';
import '../App.css';

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
            <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="header-menu" style={{ cursor: 'pointer' }}>
                <img src={process.env.PUBLIC_URL + '홈.svg'} alt="Home" className="header-menu-icon" />
                <img src={process.env.PUBLIC_URL + '가이드.svg'} alt="Guide" className="header-menu-icon" />
                <img src={process.env.PUBLIC_URL + '스케줄.svg'} alt="Schedule" className="header-menu-icon" />
                <img src={process.env.PUBLIC_URL + '차트.svg'} alt="Chart" className="header-menu-icon" />
                <img src={process.env.PUBLIC_URL + '지원하기.svg'} alt="Chart" className="header-menu-icon" />
            </div>
            <div className="social-icons">
                <a href="http://pf.kakao.com/_zfixgn" className="header-social-icon">
                    <img src={process.env.PUBLIC_URL + 'email.svg'} alt="Email" className="header-social-icon header-social-icon-email" />
                </a>
                <a href="https://x.com/sungkyustream" className="header-social-icon">
                    <img src={process.env.PUBLIC_URL + 'xlogo.svg'} alt="X" className="header-social-icon header-social-icon-x" />
                </a>
            </div>
        </header>
    );
};

export default Header;