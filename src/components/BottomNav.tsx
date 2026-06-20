import React from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import '../App.css';

const NAV_ITEMS = [
    { id: 'home', label: '홈', icon: '/home-icon.svg', iconFilled: '/home-icon-filled.svg', path: '/', disabled: false },
    { id: 'guide', label: '가이드', icon: '/guide-icon.svg', iconFilled: '/guide-icon-filled.svg', path: '/guide', disabled: false },
    { id: 'lv4', label: 'LV4', icon: '/lv4-icon.svg', iconFilled: '/lv4-icon-filled.svg', path: '/lv4', disabled: false },
    { id: 'chart', label: '차트', icon: '/chart-icon.svg', iconFilled: '/chart-icon-filled.svg', path: '/chart', disabled: false },
    { id: 'apply', label: '이벤트', icon: '/event-icon.svg', iconFilled: '/event-icon-filled.svg', path: '/event', disabled: false },
];

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 관리자 페이지에선 하단 네비 숨김
    if (location.pathname.startsWith('/admin')) return null;

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
                        src={process.env.PUBLIC_URL + (isActive(item.path) ? item.iconFilled : item.icon)}
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
