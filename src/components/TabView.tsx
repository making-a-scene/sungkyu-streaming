import React, { useState, useRef, useEffect } from 'react';
import '../App.css';

interface TabViewProps {
    tabs: string[];
    defaultTab?: number;
    onTabChange?: (index: number) => void;
}

const TabView: React.FC<TabViewProps> = ({ tabs, defaultTab = 0, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(false);
    const tabListRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    const updateGradients = () => {
        const element = tabListRef.current;
        if (!element) return;

        const { scrollLeft, scrollWidth, clientWidth } = element;
        const scrollRight = scrollWidth - clientWidth - scrollLeft;

        setShowLeftGradient(scrollLeft > 10);
        setShowRightGradient(scrollRight > 10);
    };

    useEffect(() => {
        const element = tabListRef.current;
        if (!element) return;

        updateGradients();
        element.addEventListener('scroll', updateGradients);
        window.addEventListener('resize', updateGradients);

        return () => {
            element.removeEventListener('scroll', updateGradients);
            window.removeEventListener('resize', updateGradients);
        };
    }, [tabs]);

    return (
        <div className="tab-view">
            <div className="tab-list-wrapper">
                {showLeftGradient && <div className="tab-gradient tab-gradient-left"></div>}
                {showRightGradient && <div className="tab-gradient tab-gradient-right"></div>}
                <div className="tab-list" ref={tabListRef}>
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`tab-item ${selectedTab === index ? 'selected' : ''}`}
                            onClick={() => handleTabClick(index)}
                        >
                            <div className="tab-text">{tab}</div>
                            {selectedTab === index && (
                                <div className="tab-indicator"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabView;
