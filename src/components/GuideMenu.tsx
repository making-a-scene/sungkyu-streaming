import React, { useRef } from 'react';
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

    return (
        <div className="guide-menu-bar">
            <div className="guide-menu-wrapper" ref={menuListRef}>
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
