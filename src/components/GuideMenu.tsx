import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

interface GuideMenuItem {
    label: string;
    path: string;
    disabled?: boolean;
}

const GuideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(false);
    const menuListRef = useRef<HTMLDivElement>(null);

    const menuItems: GuideMenuItem[] = [
        { label: '아이디', path: '/guide/id', disabled: true },
        { label: '스트리밍', path: '/guide/streaming', disabled: true },
        { label: '다운로드', path: '/guide/download', disabled: true },
        { label: '음악방송', path: '/guide/music-broadcast' },
        { label: '투표', path: '/guide/vote' },
        { label: '선물하기', path: '/guide/gift', disabled: true },
        { label: 'MV', path: '/guide/mv', disabled: true },
        { label: '숏폼·SNS', path: '/guide/shorts-sns', disabled: true },
        { label: '라디오', path: '/guide/radio', disabled: true },
        { label: '컬러링', path: '/guide/coloring', disabled: true }
    ];

    const handleMenuClick = (path: string, disabled?: boolean) => {
        if (!disabled) {
            navigate(path);
        }
    };

    const updateGradients = () => {
        const element = menuListRef.current;
        if (!element) return;

        const { scrollLeft, scrollWidth, clientWidth } = element;
        const scrollRight = scrollWidth - clientWidth - scrollLeft;

        setShowLeftGradient(scrollLeft > 10);
        setShowRightGradient(scrollRight > 10);
    };

    useEffect(() => {
        const element = menuListRef.current;
        if (!element) return;

        updateGradients();
        element.addEventListener('scroll', updateGradients);
        window.addEventListener('resize', updateGradients);

        return () => {
            element.removeEventListener('scroll', updateGradients);
            window.removeEventListener('resize', updateGradients);
        };
    }, []);

    return (
        <div className="guide-menu-bar">
            <div className="guide-menu-wrapper" ref={menuListRef}>
                {showLeftGradient && <div className="guide-gradient guide-gradient-left"></div>}
                {showRightGradient && <div className="guide-gradient guide-gradient-right"></div>}
                <div className="guide-menu-container">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`guide-menu-item ${location.pathname === item.path ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                            onClick={() => handleMenuClick(item.path, item.disabled)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuideMenu;
