import React, { useState } from 'react';
import '../App.css';

interface TabViewProps {
    tabs: string[];
    defaultTab?: number;
    onTabChange?: (index: number) => void;
}

const TabView: React.FC<TabViewProps> = ({ tabs, defaultTab = 0, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);

    const handleTabClick = (index: number) => {
        setSelectedTab(index);
        if (onTabChange) {
            onTabChange(index);
        }
    };

    return (
        <div className="tab-view">
            <div className="tab-list">
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
    );
};

export default TabView;
