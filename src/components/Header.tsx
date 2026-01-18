import React from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';

// Header Component
const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <img src={process.env.PUBLIC_URL + '/main-logo.svg'} alt="Logo" className="logo-icon"/>
                <div className="logo-text">
                    SUNGKYU<br/>STREAM
                </div>
            </div>
            <button className="menu-button">
                <img src={process.env.PUBLIC_URL + '/menu-icon.svg'} alt="Menu" className="menu-icon"/>
            </button>
        </header>
    );
};

export default Header;