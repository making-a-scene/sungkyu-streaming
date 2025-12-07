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
    <div className="logo-text">
        SUNGKYU<br/>STREAM
        </div>
        </div>
        <button className="menu-button">
    <img src={process.env.PUBLIC_URL + '/Menu Icon 1.svg'} alt="Menu" className="menu-icon" />
        </button>
        </header>
    );
};

export default Header;