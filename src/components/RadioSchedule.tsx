import React, { useState, useEffect } from 'react';
import { getCurrentPrograms, getStationByBroadcaster, type RadioProgram } from '../data/radioSchedule';

const formatHour = (h: number): string => `${h % 24}:00`;

const RadioCard: React.FC<{ program: RadioProgram }> = ({ program }) => {
    const station = getStationByBroadcaster(program.broadcaster);

    return (
        <div className="radio-card">
            <div className="radio-card-inner">
                <div className="radio-card-header">
                    <div className="radio-card-station">
                        <div className="radio-card-station-info">
                            <img
                                className="radio-card-logo"
                                src={station.logo}
                                alt={station.stationName}
                            />
                            <span className="radio-card-station-name">{station.stationName}</span>
                        </div>
                        <span className="radio-card-freq">{station.frequency}</span>
                    </div>
                    {program.highChance && (
                        <div className="radio-card-tag">선곡 가능성 높음</div>
                    )}
                </div>
                <div className="radio-card-content">
                    <div className="radio-card-program">
                        <span className="radio-card-program-name">{program.programName}</span>
                        {program.djNickname && (
                            <span className="radio-card-dj">DJ 애칭: {program.djNickname}</span>
                        )}
                        <span className="radio-card-time">
                            {formatHour(program.startHour)} ~ {formatHour(program.endHour)}
                        </span>
                    </div>
                    <a className="radio-card-button" href={station.smsLink}>
                        사연 보내기
                    </a>
                </div>
            </div>
        </div>
    );
};

const RadioSchedule: React.FC = () => {
    const [programs, setPrograms] = useState<RadioProgram[]>([]);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const kstOffset = 9 * 60;
            const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
            const kstHour = kstTime.getUTCHours();
            const kstDayOfWeek = kstTime.getUTCDay();
            setPrograms(getCurrentPrograms(kstHour, kstDayOfWeek));
        };

        update();
        const interval = setInterval(update, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (programs.length === 0) return null;

    return (
        <div className="radio-schedule-section">
            <h2 className="radio-schedule-title">라디오 신청 원클릭</h2>
            <div className="radio-schedule-cards">
                {programs.map((program, idx) => (
                    <RadioCard
                        key={`${program.broadcaster}-${program.startHour}-${idx}`}
                        program={program}
                    />
                ))}
            </div>
        </div>
    );
};

export default RadioSchedule;
