import React, { useState } from 'react';
import '../App.css';

const AnnouncementSection: React.FC = () => {
    const [popupImage, setPopupImage] = useState<string | null>(null);

    return (
        <div className="announcement-section">
            <h2 className="home-section-title">🎉 김성규 6th Mini Album [OFF THE MAP] 발매 🎉</h2>
            <div className="announcement-links">
                <div className="announcement-link-item" onClick={() => setPopupImage(process.env.PUBLIC_URL + '/streaming-list-final.png')}>
                    <span className="announcement-link-text">권장 스트리밍 리스트</span>
                    <img
                        src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                        alt=""
                        className="announcement-link-arrow"
                    />
                </div>
                <a href="https://kko.to/rvJIOjuxNy" target="_blank" rel="noreferrer">
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
                </a>
            </div>

            {popupImage && (
                <div className="image-popup-overlay" onClick={() => setPopupImage(null)}>
                    <div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="image-popup-close" onClick={() => setPopupImage(null)}>
                            <img src={process.env.PUBLIC_URL + '/close-icon.svg'} alt="닫기" />
                        </button>
                        <img src={popupImage} alt="" className="image-popup-img" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnouncementSection;
