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
                <img src={process.env.PUBLIC_URL + 'Group.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="social-icons">
                <a href="http://pf.kakao.com/_zfixgn" className="header-social-icon">
                    <img src={process.env.PUBLIC_URL + 'email.svg'} alt="Email" className="header-social-icon header-social-icon-email" />
                </a>
                <a href="https://x.com/sungkyustream" className="header-social-icon">
                    <img src={process.env.PUBLIC_URL + 'xlogo 1.svg'} alt="X" className="header-social-icon header-social-icon-x" />
                </a>
            </div>
        </header>
    );
};

export default Header;