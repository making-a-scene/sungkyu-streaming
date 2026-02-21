import React from 'react';
import '../App.css';

const AnnouncementSection: React.FC = () => {
    return (
        <div className="announcement-section">
            <h2 className="home-section-title">🔥 2/21 선공개곡 발매 🔥</h2>
            <div className="announcement-links">
                <div className="announcement-link-item">
                    <span className="announcement-link-text">음원 총공 임시 타임테이블</span>
                    <img
                        src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                        alt=""
                        className="announcement-link-arrow"
                    />
                </div>
                <div className="announcement-link-item">
                    <span className="announcement-link-text">권장 스트리밍 리스트</span>
                    <img
                        src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                        alt=""
                        className="announcement-link-arrow"
                    />
                </div>
                <div className="announcement-link-item gradient">
                    <div className="announcement-link-bg">
                        <img
                            src={process.env.PUBLIC_URL + '/assets/761a3422f8c591d1c88725835b4299989c1606d6.png'}
                            alt=""
                        />
                    </div>
                    <span className="announcement-link-text">음총팀 뮤직웨이브 입장하기</span>
                    <img
                        src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                        alt=""
                        className="announcement-link-arrow"
                    />
                </div>
            </div>
        </div>
    );
};

export default AnnouncementSection;
