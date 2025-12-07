import React from 'react';
import '../App.css';

import Header from '../components/Header';
import NotificationBanner from '../components/NotificationBanner';
import Footer from '../components/Footer';

// Guide Card Component
interface GuideCardProps {
    title: string;
    iconSrc: string;
    isActive: boolean;
    isSpecial?: boolean;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, iconSrc, isActive, isSpecial }) => {
    return (
        <div className={`guide-card ${isActive ? 'active' : 'inactive'} ${isSpecial ? 'special' : ''}`}>
            <div className="guide-title">{title}</div>
            <img src={iconSrc} alt={title} className="guide-icon" />
            {!isActive && <div className="hover-message">12월 중 업로드 예정</div>}
        </div>
    );
};

// Guide Grid Component
const GuideGrid: React.FC = () => {
    const guides = [
        { title: '아이디 생성\n가이드', iconSrc: process.env.PUBLIC_URL + '/identified 1.svg', isActive: false, isSpecial: false },
        { title: '스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/Music Icon (1) 1.svg', isActive: false, isSpecial: false },
        { title: '다운로드\n가이드', iconSrc: process.env.PUBLIC_URL + '/Music Icon (2) 1.svg', isActive: false, isSpecial: false },
        { title: '음악방송\n가이드', iconSrc: process.env.PUBLIC_URL + '/trophy (1) 1.svg', isActive: true, isSpecial: false },
        { title: '투표\n가이드', iconSrc: process.env.PUBLIC_URL + '/Vote Icon 1.svg', isActive: true, isSpecial: false },
        { title: '숏폼·SNS\n가이드', iconSrc: process.env.PUBLIC_URL + '/trending-topic 1.svg', isActive: false, isSpecial: true },
        { title: 'MV 스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/Video Media Player 1.svg', isActive: false, isSpecial: false },
        { title: '라디오\n가이드', iconSrc: process.env.PUBLIC_URL + '/005-podcast 1.svg', isActive: false, isSpecial: false },
        { title: '컬러링\n가이드', iconSrc: process.env.PUBLIC_URL + '/Call Icon (1) 1.svg', isActive: false, isSpecial: false },
        { title: '선물하기\n가이드', iconSrc: process.env.PUBLIC_URL + '/Gift Chocolate Box 1.svg', isActive: false, isSpecial: false },
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
                />
            ))}
        </div>
    );
};

function Home() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <NotificationBanner />
                <GuideGrid />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
