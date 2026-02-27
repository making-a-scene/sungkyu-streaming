import React from 'react';
import '../App.css';

// 현재 앨범 정보 (신곡 발매 시 여기만 변경)
const CURRENT_ALBUM = {
    name: 'OFF THE MAP',
    art: '/assets/31d16c2716416214ac6a6e8127086ffc2cb85419.png',
};

// 차트명 키워드 → 플랫폼 아이콘
const PLATFORM_ICONS: [string, string][] = [
    ['멜론', '/assets/b8af7c06789987325e94b2ffdf106371ee381a1f.png'],
    ['지니', '/assets/d6b1c5cb4ff44286079e79d7ad0682bd8ed1f357.png'],
    ['벅스', '/assets/f7b71e5a8c6270a1b988ea59fa800e1a12dcf81d.png'],
    ['플로', '/assets/661c8273b064e8efd3a9aa68a0a26e191cb6c129.png'],
    ['바이브', '/assets/eba6020c5e645ff8c96da96b2367bb65f6a57e25.png'],
];

function getPlatformIcon(chartName: string): string {
    for (const [keyword, icon] of PLATFORM_ICONS) {
        if (chartName.includes(keyword)) return icon;
    }
    return '';
}

export interface ChartEntry {
    rank: number;
    title: string;
    artist: string;
}

interface ChartCardProps {
    chartName: string;
    songs: ChartEntry[];
    updatedAt: string;
    prevSongs?: ChartEntry[];
}

// "2026-02-24 20:28" → "2026.02.24. 20:00"
function formatTime(dt: string): string {
    const [datePart, timePart] = dt.split(' ');
    const hour = timePart?.split(':')[0] || '00';
    return `${datePart.replace(/-/g, '.')}. ${hour}:00`;
}

const ChartCard: React.FC<ChartCardProps> = ({ chartName, songs, updatedAt, prevSongs }) => {
    const icon = getPlatformIcon(chartName);

    const getRankChange = (title: string, currentRank: number): number | null => {
        if (!prevSongs) return null;
        const prev = prevSongs.find(s => s.title === title);
        if (!prev) return null;
        return prev.rank - currentRank;
    };

    return (
        <div className="chart-card">
            <div className="chart-card-header">
                <div className="chart-card-platform">
                    {icon && <img src={icon} alt="" className="chart-platform-icon" />}
                    <span className="chart-card-name">{chartName}</span>
                </div>
                <span className="chart-card-time">{formatTime(updatedAt)}</span>
            </div>
            {songs.length > 0 && (
                <div className="chart-card-songs">
                    {songs.map(song => {
                        const change = getRankChange(song.title, song.rank);
                        return (
                            <div className="chart-song-entry" key={`${song.title}-${song.rank}`}>
                                <div className="chart-song-left">
                                    <img src={CURRENT_ALBUM.art} alt={song.title} className="chart-song-art" />
                                    <div className="chart-song-info">
                                        <span className="chart-song-title">{song.title}</span>
                                        <span className="chart-song-album">{CURRENT_ALBUM.name}</span>
                                    </div>
                                </div>
                                <div className="chart-song-rank">
                                    <span className="chart-rank-number">{song.rank}위</span>
                                    {change !== null && change !== 0 && (
                                        <span className={`chart-rank-change ${change > 0 ? 'up' : 'down'}`}>
                                            {change > 0 ? `${change}↑` : `${Math.abs(change)}↓`}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ChartCard;
