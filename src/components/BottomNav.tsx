import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import '../App.css';

const NAV_ITEMS = [
    { id: 'home', label: '홈', icon: '/home-icon.svg', path: '/', disabled: false },
    { id: 'guide', label: '가이드', icon: '/guide-icon.svg', path: '/guide', disabled: true },
    { id: 'schedule', label: '스케줄', icon: '/schedule-icon.svg', path: '/schedule', disabled: true },
    { id: 'chart', label: '차트', icon: '/chart-icon.svg', path: '/chart/mv', disabled: false },
    { id: 'apply', label: '지원', icon: '/apply-icon.svg', path: '/apply', disabled: true },
];

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
        if (!item.disabled) {
            navigate(item.path);
        }
    };

    return (
        <nav className="bottom-nav">
            {NAV_ITEMS.map((item) => (
                <div
                    key={item.id}
                    className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                    onClick={() => handleNavClick(item)}
                >
                    <img
                        src={process.env.PUBLIC_URL + item.icon}
                        alt={item.label}
                        className="bottom-nav-icon"
                    />
                    <span className="bottom-nav-label">{item.label}</span>
                </div>
            ))}
        </nav>
    );
};

export default BottomNav;
