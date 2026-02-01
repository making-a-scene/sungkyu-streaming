import React from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';

const CheeringGuideBanner: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="cheering-guide-banner" onClick={() => navigate('/guide/cheering')}>
            <img src={process.env.PUBLIC_URL + '/song-icon.svg'} alt="Cheering Guide" className="cheering-guide-icon" />
            <div className="cheering-guide-text">
                응원법 · 떼창곡 가이드
            </div>
            <button className="cheering-guide-arrow">
                <img className="cheering-arrow-icon" src={process.env.PUBLIC_URL + '/arrow-icon.svg'} alt="Move" />
            </button>
        </div>
    );
};

export default CheeringGuideBanner;
