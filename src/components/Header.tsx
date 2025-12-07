import React from 'react';
import '../App.css';

// Header Component
const Header: React.FC = () => {
    return (
        <header className="header">
        <div className="logo">
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