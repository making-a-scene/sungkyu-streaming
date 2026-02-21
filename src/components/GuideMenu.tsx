import React, {useRef, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const GuideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuListRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: '아이디', path: '/guide/id-generation', disabled: false },
        { label: '스트리밍', path: '/guide/streaming', disabled: false },
        { label: '다운로드', path: '/guide/download', disabled: false },
        { label: '음악방송', path: '/guide/music-broadcast', disabled: false },
        { label: '투표', path: '/guide/vote', disabled: false },
        { label: '음악 나누기', path: '/guide/music-sharing', disabled: false },
        { label: 'MV', path: '/guide/mv', disabled: false },
        { label: '숏폼·SNS', path: '/guide/shorts-sns', disabled: false },
        { label: '라디오', path: '/guide/radio', disabled: false },
        { label: '컬러링', path: '/guide/coloring', disabled: false },
        { label: '응원법', path: '/guide/cheering', disabled: false }
    ];

    const handleMenuClick = (path: string, disabled: boolean) => {
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
        <div className="sub-menu-bar" style={{ position: 'sticky', top: 72, zIndex: 90, background: '#282828' }}>
            <div className="sub-menu-wrapper" ref={menuListRef}>
                <div className="sub-menu-container">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            ref={location.pathname === item.path ? activeItemRef : null}
                            className={`sub-menu-item ${location.pathname === item.path ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
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
