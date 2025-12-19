import React, {useRef, useEffect} from 'react';
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
    const activeItemRef = useRef<HTMLDivElement>(null);

    const menuItems: GuideMenuItem[] = [
        { label: '아이디', path: '/guide/id-generation', disabled: false },
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

    useEffect(() => {
        if (activeItemRef.current && menuListRef.current) {
            activeItemRef.current.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [location.pathname]);

    return (
        <div className="guide-menu-bar">
            <div className="guide-menu-wrapper" ref={menuListRef}>
                <div className="guide-menu-container">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            ref={location.pathname === item.path ? activeItemRef : null}
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
