import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CheeringGuideBanner from '../components/CheeringGuideBanner';

// Guide Card Component
interface GuideCardProps {
    title: string;
    iconSrc: string;
    isActive: boolean;
    onClick?: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, iconSrc, isActive, onClick }) => {
    return (
        <div
            className={`guide-card ${isActive ? 'active' : 'inactive'}`}
            onClick={onClick}
        >
            <div className="guide-title">{title}</div>
            <img src={iconSrc} alt={title} className="guide-icon" />
            {!isActive && <div className="hover-message">준비중</div>}
        </div>
    );
};

const GuideGrid = () => {
    const navigate = useNavigate();

    const guides = [
        { title: '아이디 생성\n가이드', iconSrc: process.env.PUBLIC_URL + '/id-generation-icon.svg', isActive: true, page: '/guide/id-generation' },
        { title: '스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/streaming-icon.svg', isActive: true, page: null },
        { title: '다운로드\n가이드', iconSrc: process.env.PUBLIC_URL + '/download-icon.svg', isActive: true, page: null },
        { title: '음악방송\n가이드', iconSrc: process.env.PUBLIC_URL + '/music-broadcast-icon.svg', isActive: true, page: '/guide/music-broadcast' },
        { title: '투표\n가이드', iconSrc: process.env.PUBLIC_URL + '/vote-icon.svg', isActive: true, page: '/guide/vote' },
        { title: '음악 나누기\n가이드', iconSrc: process.env.PUBLIC_URL + '/music-sharing-icon.svg', isActive: true, page: '/guide/music-sharing' },
        { title: 'MV\n가이드', iconSrc: process.env.PUBLIC_URL + '/mv-icon.svg', isActive: true, page: '/guide/mv' },
        { title: '숏폼·SNS\n가이드', iconSrc: process.env.PUBLIC_URL + '/shorts-sns-icon.svg', isActive: true, page: '/guide/shorts-sns' },
        { title: '라디오\n가이드', iconSrc: process.env.PUBLIC_URL + '/radio-icon.svg', isActive: true, page: '/guide/radio' },
        { title: '컬러링\n가이드', iconSrc: process.env.PUBLIC_URL + '/coloring-icon.svg', isActive: true, page: '/guide/coloring' }
    ];

    return (
        <div className="guide-grid">
            {guides.map((guide, index) =>
                    <GuideCard
                        key={index}
                        title={guide.title}
                        iconSrc={guide.iconSrc}
                        isActive={guide.isActive}
                        onClick={guide.page ? () => navigate(guide.page) : undefined}
                    />
            )}
        </div>
    );
};

const Home = () => {
    return (
        <div className="app">
            <Header />
            <CheeringGuideBanner />
            <main className="main-content">
                <GuideGrid />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
