import React, { useState, useEffect } from 'react';

interface StreamingCounterProps {
    songName: string;
}

const StreamingCounter: React.FC<StreamingCounterProps> = ({ songName }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // KST = UTC + 9
    const kstOffset = 9 * 60;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const kstTotalMinutes = utcMinutes + kstOffset;
    const kstHour = Math.floor(kstTotalMinutes / 60) % 24;

    // KST 기준 현재 날짜 계산
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
    const kstYear = kstTime.getUTCFullYear();
    const kstMonth = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
    const kstDay = String(kstTime.getUTCDate()).padStart(2, '0');
    const kstHourStr = String(kstHour).padStart(2, '0');

    // 발매 시각: 2026-02-21 18:00 KST
    const releaseKST = new Date(Date.UTC(2026, 1, 21, 18 - 9, 0, 0));
    const hoursSinceRelease = Math.floor((now.getTime() - releaseKST.getTime()) / (1000 * 60 * 60));
    const count = Math.max(hoursSinceRelease * 4, 0);

    const referenceTime = `${kstYear}.${kstMonth}.${kstDay}. ${kstHourStr}:00 기준`;

    return (
        <div className="streaming-counter">
            <div className="streaming-counter-inner">
                <div className="streaming-counter-title">
                    <p>권장 스밍리스트 기준</p>
                    <p>{songName} 스트리밍 횟수</p>
                </div>
                <div className="streaming-counter-info">
                    <div className="streaming-counter-desc">
                        <span className="streaming-counter-desc-text">
                            발매 직후부터 누락이 없었다면
                        </span>
                        <div className="streaming-counter-time">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.33337C4.32 1.33337 1.33334 4.32004 1.33334 8.00004C1.33334 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00004C14.6667 4.32004 11.68 1.33337 8 1.33337ZM8 13.3334C5.05334 13.3334 2.66668 10.9467 2.66668 8.00004C2.66668 5.05337 5.05334 2.66671 8 2.66671C10.9467 2.66671 13.3333 5.05337 13.3333 8.00004C13.3333 10.9467 10.9467 13.3334 8 13.3334ZM8.33334 4.66671H7.33334V8.66671L10.8333 10.7667L11.3333 9.94671L8.33334 8.16671V4.66671Z" fill="#696969"/>
                            </svg>
                            <span>{referenceTime}</span>
                        </div>
                    </div>
                    <div className="streaming-counter-count">
                        {count}회
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StreamingCounter;
