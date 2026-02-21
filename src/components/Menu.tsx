import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import '../App.css';
import SocialIcons from "./SocialIcons";
import Footer from "./Footer";

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { id: 'home', label: '홈', icon: '/home-icon.svg', path: '/', disabled: false },
    { id: 'guide', label: '가이드', icon: '/guide-icon.svg', path: '/guide', disabled: false },
    { id: 'schedule', label: '스케줄', icon: '/schedule-icon.svg', path: '/schedule', disabled: true },
    { id: 'chart', label: '차트', icon: '/chart-icon.svg', path: '/chart/mv', disabled: false },
    { id: 'apply', label: '지원하기', icon: '/apply-icon.svg', path: '/apply', disabled: true },
];

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isClosing, setIsClosing] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
        }
    }, [isOpen]);

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShouldRender(false);
            onClose();
        }, 250);
    };

    const handleMenuClick = (item: typeof MENU_ITEMS[0]) => {
        if (!item.disabled) {
            setIsClosing(true);
            setTimeout(() => {
                navigate(item.path);
                setShouldRender(false);
                onClose();
            }, 250);
        }
    };

    if (!shouldRender) return null;

    return (
        <div className={`menu-overlay ${isClosing ? 'closing' : ''}`}>
            <div className="menu-header">
                <button className="menu-close-button" onClick={handleClose}>
                    <img src={process.env.PUBLIC_URL + '/close-icon.svg'} alt="Close" className="menu-close-icon"/>
                </button>
            </div>
            <div className="menu-content">
                <nav className="menu-nav">
                    {MENU_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-nav-item ${isActive(item.path) ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                            onClick={() => handleMenuClick(item)}
                        >
                            <img
                                src={process.env.PUBLIC_URL + item.icon}
                                alt={item.label}
                                className="menu-nav-icon"
                            />
                            <span className="menu-nav-text">{item.label}</span>
                        </div>
                    ))}
                </nav>
                <div className="menu-footer">
                    <SocialIcons />
                    <p className="menu-copyright">© 김성규 음원총공팀 sungkyustream 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Menu;
