import React, {useRef, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const ChartMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuListRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: '멜론', path: '/chart/melon', disabled: true },
        { label: '지니', path: '/chart/genie', disabled: true },
        { label: '벅스', path: '/chart/bugs', disabled: true },
        { label: '플로', path: '/chart/flo', disabled: true },
        { label: '바이브', path: '/chart/vibe', disabled: true },
        { label: 'MV', path: '/chart/mv', disabled: false },
        { label: '틱톡', path: '/chart/tiktok', disabled: true },
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

export default ChartMenu;
