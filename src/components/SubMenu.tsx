import React, {useRef, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

interface SubMenuItem {
    label: string;
    path: string;
    disabled?: boolean;
}

interface SubMenuProps {
    menuItems: SubMenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({menuItems}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuListRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = (item: SubMenuItem) => {
        if (!item.disabled) {
            navigate(item.path);
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
        <div className="sub-menu-bar">
            <div className="sub-menu-wrapper" ref={menuListRef}>
                <div className="sub-menu-container">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            ref={location.pathname === item.path ? activeItemRef : null}
                            className={`sub-menu-item ${location.pathname === item.path ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                            onClick={() => handleMenuClick(item)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubMenu;
