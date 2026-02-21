import React, { useState, useEffect } from 'react';
import '../App.css';

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const targetDate = new Date('2026-03-02T18:00:00+09:00');

        const updateTimer = () => {
            const now = new Date();
            const diff = targetDate.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft('00:00:00');
                return;
            }

            const totalHours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(
                `${totalHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            );
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown-section">
            <div className="countdown-subtitle">김성규 6th Mini Album [OFF THE MAP] 발매</div>
            <div className="countdown-time">{timeLeft}</div>
        </div>
    );
};

export default CountdownTimer;
