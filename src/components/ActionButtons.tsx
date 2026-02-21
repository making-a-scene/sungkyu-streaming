import React from 'react';
import '../App.css';

const ActionButtons: React.FC = () => {
    return (
        <div className="action-buttons-bar">
            <div className="action-buttons-inner">
                <div className="action-button">아이디 기부</div>
                <div className="action-divider" />
                <div className="action-button">헬퍼 신청</div>
                <div className="action-divider" />
                <div className="action-button">음총 모금</div>
            </div>
        </div>
    );
};

export default ActionButtons;
