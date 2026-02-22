import React, { useState, useEffect } from 'react';
import '../App.css';

interface CountdownTimerProps {
    releaseKST: Date;
    albumName: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({releaseKST, albumName}) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            const diff = releaseKST.getTime() - now.getTime();

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
            <div className="countdown-subtitle">김성규 {albumName} 발매</div>
            <div className="countdown-time">{timeLeft}</div>
        </div>
    );
};

export default CountdownTimer;
