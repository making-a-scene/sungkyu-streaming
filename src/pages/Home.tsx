import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../App.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

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

const GuideGrid = () => {
    const navigate = useNavigate();

    const guides = [
        { title: '아이디 생성\n가이드', iconSrc: process.env.PUBLIC_URL + '/id-generation-icon.svg', isActive: true, isSpecial: false, page: '/guide/id-generation' },
        { title: '스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/streaming-icon-inactive.svg', isActive: false, isSpecial: false, page: null },
        { title: '다운로드\n가이드', iconSrc: process.env.PUBLIC_URL + '/download-icon-inactive.svg', isActive: false, isSpecial: false, page: null },
        { title: '음악방송\n가이드', iconSrc: process.env.PUBLIC_URL + '/music-broadcast-icon.svg', isActive: true, isSpecial: false, page: '/guide/music-broadcast' },
        { title: '투표\n가이드', iconSrc: process.env.PUBLIC_URL + '/vote-icon.svg', isActive: true, isSpecial: false, page: '/guide/vote' },
        { title: '음악나누기\n가이드', iconSrc: process.env.PUBLIC_URL + '/music-sharing-icon.svg', isActive: true, isSpecial: false, page: '/guide/music-sharing' },
        { title: 'MV\n가이드', iconSrc: process.env.PUBLIC_URL + '/mv-icon-inactive.svg', isActive: false, isSpecial: false, page: null },
        { title: '숏폼·SNS\n가이드', iconSrc: process.env.PUBLIC_URL + '/shorts-sns-icon-inactive.svg', isActive: false, isSpecial: true, page: null },
        { title: '라디오\n가이드', iconSrc: process.env.PUBLIC_URL + '/radio-icon-inactive.svg', isActive: false, isSpecial: false, page: null },
        { title: '컬러링\n가이드', iconSrc: process.env.PUBLIC_URL + '/coloring-icon-inactive.svg', isActive: false, isSpecial: false, page: null }
    ];

    return (
        <div className="guide-grid">
            {guides.map((guide, index) =>
                    <GuideCard
                        key={index}
                        title={guide.title}
                        iconSrc={guide.iconSrc}
                        isActive={guide.isActive}
                        isSpecial={guide.isSpecial}
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
            <main className="main-content">
                <GuideGrid />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
