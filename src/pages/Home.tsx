import React from 'react';
import '../App.css';

import Header from '../components/Header';
import NotificationBanner from '../components/NotificationBanner';
import Footer from '../components/Footer';

interface HomeProps {
    onNavigate: (page: string) => void;
}

// Guide Card Component
interface GuideCardProps {
    title: string;
    iconSrc: string;
    isActive: boolean;
    isSpecial?: boolean;
    onClick?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, iconSrc, isActive, isSpecial, onClick }) => {
    return (
        <div
            className={`guide-card ${isActive ? 'active' : 'inactive'} ${isSpecial ? 'special' : ''}`}
            onClick={onClick}
        >
            <div className="guide-title">{title}</div>
            <img src={iconSrc} alt={title} className="guide-icon" />
            {!isActive && <div className="hover-message">준비중</div>}
        </div>
    );
};

// Guide Grid Component
interface GuideGridProps {
    onNavigate: (page: string) => void;
}

const GuideGrid: React.FC<GuideGridProps> = ({ onNavigate }) => {
    const guides = [
        { title: '아이디 생성\n가이드', iconSrc: process.env.PUBLIC_URL + '/아이디 생성 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/스트리밍 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '다운로드\n가이드', iconSrc: process.env.PUBLIC_URL + '/다운로드 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '음악방송\n가이드', iconSrc: process.env.PUBLIC_URL + '/음악방송 가이드.svg', isActive: true, isSpecial: false, page: 'music-broadcast' },
        { title: '투표\n가이드', iconSrc: process.env.PUBLIC_URL + '/투표 가이드.svg', isActive: true, isSpecial: false, page: null },
        { title: '숏폼·SNS\n가이드', iconSrc: process.env.PUBLIC_URL + '/숏폼SNS 가이드.svg', isActive: false, isSpecial: true, page: null },
        { title: 'MV 스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/MV 스트리밍 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '라디오\n가이드', iconSrc: process.env.PUBLIC_URL + '/라디오 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '컬러링\n가이드', iconSrc: process.env.PUBLIC_URL + '/컬러링 가이드.svg', isActive: false, isSpecial: false, page: null },
        { title: '선물하기\n가이드', iconSrc: process.env.PUBLIC_URL + '/선물하기 가이드.svg', isActive: false, isSpecial: false, page: null },
    ];

    return (
        <div className="guide-grid">
            {guides.map((guide, index) => (
                <GuideCard
                    key={index}
                    title={guide.title}
                    iconSrc={guide.iconSrc}
                    isActive={guide.isActive}
                    isSpecial={guide.isSpecial}
                    onClick={guide.page ? () => onNavigate(guide.page!) : undefined}
                />
            ))}
        </div>
    );
};

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="app">
            <Header onNavigate={onNavigate} />
            <main className="main-content">
                <NotificationBanner />
                <GuideGrid onNavigate={onNavigate} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
