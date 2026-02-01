import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import Menu from './Menu';

// Header Component
const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={process.env.PUBLIC_URL + '/sungkyustrm.svg'} alt="Logo" className="logo-icon"/>
                </div>
                <button className="menu-button" onClick={() => setIsMenuOpen(true)}>
                    <img src={process.env.PUBLIC_URL + '/menu-icon.svg'} alt="Menu" className="menu-icon"/>
                </button>
            </header>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;