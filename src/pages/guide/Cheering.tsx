import React, { useState } from 'react';
import '../../App.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GuideMenu from '../../components/GuideMenu';
import chantData from '../../data/sungkyu-chant.json';
import infiniteChantData from '../../data/infinite-chant.json';

type FilterType = 'all' | 'otm' | 'fanchat' | 'chorus';
type ArtistType = 'sungkyu' | 'infinite';

type ChantItem = {
    title: string;
    is_fanchat: boolean;
    is_otm?: boolean;
    aliases: string[];
    chant: string;
    youtube_url?: string;
};

// Album cover mapping
const getYoutubeEmbedUrl = (url: string): string => {
    const match = url.match(/youtu\.be\/([^?]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
};

const albumCovers: { [key: string]: string } = {
    'Over It': '/album-otm.png',
    'Dreaming': '/album-otm.png',
    '모범답안 (Answer)': '/album-otm.png',
    '60초': '/album-another-me.png',
    'Shine': '/album-another-me.png',
    'Kontrol': '/album-27.png',
    '답가': '/album-27.png',
    'True Love': '/album-10stories.png',
    '끌림': '/album-10stories.png',
    "I'm Cold": '/album-inside-me.png',
    "DIVIN'": '/album-inside-me.png',
    'Climax': '/album-inside-me.png',
    'HUSH': '/album-hush.png',
    'You': '/album-hush.png',
    '나의 하루': '/album-hush.png',
    'Savior': '/album-project-s.png',
    '안개': '/album-project-s.png',
    'Ready To Go': '/album-ready-to-go.png',
    '꼭 (Like a dream)': '/album-like-a-dream.png',
    'Small Talk': '/album-small-talk.png',
    'It Will Be': '/album-small-talk.png',
    '다시 돌아와': '/infinite/infinite-album-first-invasion.jpg',
    "She's Back": '/infinite/infinite-album-first-invasion.jpg',
    'BTD': '/infinite/infinite-album-evolution.jpg',
    "Nothing's Over": '/infinite/infinite-album-inspirit.jpg',
    'Can U Smile': '/infinite/infinite-album-inspirit.jpg',
    '내꺼하자': '/infinite/infinite-album-over-the-top.jpg',
    'Paradise': '/infinite/infinite-album-paradise.jpg',
    '추격자': '/infinite/infinite-album-infinitize.jpg',
    'Man In Love': '/infinite/infinite-album-new-challenge.jpg',
    '그리움이 닿는 곳에': '/infinite/infinite-album-new-challenge.jpg',
    'Destiny': '/infinite/infinite-album-destiny.jpg',
    'Last Romeo': '/infinite/infinite-album-season-2.jpg',
    '소나기': '/infinite/infinite-album-season-2.jpg',
    'Back': '/infinite/infinite-album-be-back.jpg',
    'Bad': '/infinite/infinite-album-reality.jpg',
    '태풍': '/infinite/infinite-album-infinite-only.jpg',
    'Tell Me': '/infinite/infinite-album-top-seed.jpg',
    'New Emotions': '/infinite/infinite-album-13egin.jpg',
    'Dangerous': '/infinite/infinite-album-like-infinite.jpg',
};

const getAlbumCover = (title: string): string => {
    return albumCovers[title] || '';
};

// Parse chant text with color markers
const parseChant = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let keyCounter = 0;

        while (remaining.length > 0) {
            const blueStart = remaining.indexOf('[[');
            const yellowStart = remaining.indexOf('<<');

            if (blueStart === -1 && yellowStart === -1) {
                if (remaining) {
                    parts.push(<span key={`${lineIndex}-${keyCounter++}`}>{remaining}</span>);
                }
                break;
            }

            let nextMarkerStart: number;
            let isBlue: boolean;

            if (blueStart === -1) {
                nextMarkerStart = yellowStart;
                isBlue = false;
            } else if (yellowStart === -1) {
                nextMarkerStart = blueStart;
                isBlue = true;
            } else {
                if (blueStart < yellowStart) {
                    nextMarkerStart = blueStart;
                    isBlue = true;
                } else {
                    nextMarkerStart = yellowStart;
                    isBlue = false;
                }
            }

            if (nextMarkerStart > 0) {
                parts.push(<span key={`${lineIndex}-${keyCounter++}`}>{remaining.substring(0, nextMarkerStart)}</span>);
            }

            const endMarker = isBlue ? ']]' : '>>';
            const endIndex = remaining.indexOf(endMarker, nextMarkerStart + 2);

            if (endIndex === -1) {
                parts.push(<span key={`${lineIndex}-${keyCounter++}`}>{remaining.substring(nextMarkerStart)}</span>);
                break;
            }

            const coloredText = remaining.substring(nextMarkerStart + 2, endIndex);
            const colorClass = isBlue ? 'chant-blue' : 'chant-yellow';
            parts.push(
                <span key={`${lineIndex}-${keyCounter++}`} className={colorClass}>
                    {coloredText}
                </span>
            );

            remaining = remaining.substring(endIndex + 2);
        }

        return (
            <p key={lineIndex} className="chant-line">
                {parts.length > 0 ? parts : '\u00A0'}
            </p>
        );
    });
};

// Normalize text for search (lowercase, remove spaces)
const normalizeText = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '');
};

const Cheering: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [artist, setArtist] = useState<ArtistType>('sungkyu');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<ChantItem | null>(null);
    const [isModalClosing, setIsModalClosing] = useState(false);

    const activeChantData = artist === 'sungkyu'
        ? chantData as ChantItem[]
        : infiniteChantData as ChantItem[];

    const filteredData = activeChantData.filter((item) => {
        // Filter by type
        if (filter === 'otm' && !item.is_otm) return false;
        if (filter === 'fanchat' && !item.is_fanchat) return false;
        if (filter === 'chorus' && item.is_fanchat) return false;

        // Filter by search query
        if (searchQuery.trim()) {
            const normalizedQuery = normalizeText(searchQuery);
            const titleMatch = normalizeText(item.title).includes(normalizedQuery);
            const aliasMatch = item.aliases.some(alias =>
                normalizeText(alias).includes(normalizedQuery)
            );
            const chantMatch = normalizeText(item.chant).includes(normalizedQuery);

            if (!titleMatch && !aliasMatch && !chantMatch) return false;
        }

        return true;
    });

    const handleItemClick = (item: ChantItem) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setSelectedItem(null);
            setIsModalClosing(false);
            document.body.style.overflow = '';
        }, 250);
    };

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <main className="main-content cheering-main">
                <div className="cheering-search-container">
                    <div className="cheering-search-box">
                        <img src={process.env.PUBLIC_URL + '/search-icon.svg'} alt="Search" className="cheering-search-icon" />
                        <input
                            type="text"
                            className="cheering-search-input"
                            placeholder="곡명 또는 가사를 입력하세요."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="cheering-filter-row">
                        <div className="cheering-filter-tabs">
                            <button
                                className={`cheering-filter-tab ${filter === 'all' ? 'active' : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                전체
                            </button>
                            {artist === 'sungkyu' && (
                                <>
                                    <button
                                        className={`cheering-filter-tab ${filter === 'otm' ? 'active' : ''}`}
                                        onClick={() => setFilter('otm')}
                                    >
                                        OTM
                                    </button>
                                    <button
                                        className={`cheering-filter-tab ${filter === 'fanchat' ? 'active' : ''}`}
                                        onClick={() => setFilter('fanchat')}
                                    >
                                        응원법
                                    </button>
                                    <button
                                        className={`cheering-filter-tab ${filter === 'chorus' ? 'active' : ''}`}
                                        onClick={() => setFilter('chorus')}
                                    >
                                        떼창곡
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="cheering-artist-toggle" aria-label="응원법 가수 선택">
                            <button
                                className={`cheering-artist-toggle-button ${artist === 'sungkyu' ? 'active' : ''}`}
                                onClick={() => setArtist('sungkyu')}
                                aria-pressed={artist === 'sungkyu'}
                            >
                                성규
                            </button>
                            <button
                                className={`cheering-artist-toggle-button ${artist === 'infinite' ? 'active' : ''}`}
                                onClick={() => {
                                    setArtist('infinite');
                                    setFilter('all');
                                }}
                                aria-pressed={artist === 'infinite'}
                            >
                                인피니트
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cheering-list">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className="cheering-item"
                            onClick={() => handleItemClick(item)}
                        >
                            <div className="cheering-item-left">
                                <div className="cheering-item-album">
                                    {getAlbumCover(item.title) ? (
                                        <img
                                            src={process.env.PUBLIC_URL + getAlbumCover(item.title)}
                                            alt={item.title}
                                            className="cheering-item-album-img"
                                        />
                                    ) : (
                                        <div className="cheering-item-album-placeholder" />
                                    )}
                                </div>
                                <span className="cheering-item-title">{item.title}</span>
                            </div>
                            <div className="cheering-item-right">
                                {item.is_otm && (
                                    <span className="cheering-item-badge otm">OTM</span>
                                )}
                                <span className={`cheering-item-badge ${item.is_fanchat ? 'fanchat' : 'chorus'}`}>
                                    {item.is_fanchat ? '응원법' : '떼창곡'}
                                </span>
                                <img src={process.env.PUBLIC_URL + '/arrow-icon.svg'} alt="Arrow" className="cheering-item-arrow" />
                            </div>
                        </div>
                    ))}
                    {filteredData.length === 0 && (
                        <div className="cheering-empty-message">
                            {artist === 'infinite' && activeChantData.length === 0
                                ? '인피니트 응원법을 준비 중입니다.'
                                : '검색 결과가 없습니다.'}
                        </div>
                    )}
                </div>
                <div className="cheering-footer-message">
                    <p>제안 또는 오류 제보는</p>
                    <p>음총팀 이메일로 부탁드립니다!</p>
                    <p>sungkyustream@gmail.com</p>
                </div>
            </main>
            <Footer />

            {/* Modal */}
            {selectedItem && (
                <div className={`cheering-modal-overlay ${isModalClosing ? 'closing' : ''}`} onClick={handleCloseModal}>
                    <div className={`cheering-modal ${isModalClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="cheering-modal-header">
                            <div className="cheering-modal-title-container">
                                <span className="cheering-modal-title">{selectedItem.title}</span>
                                <span className={`cheering-modal-badge ${selectedItem.is_fanchat ? 'fanchat' : 'chorus'}`}>
                                    {selectedItem.is_fanchat ? '응원법' : '떼창곡'}
                                </span>
                            </div>
                            <button className="cheering-modal-close" onClick={handleCloseModal}>
                                <img src={process.env.PUBLIC_URL + '/close-icon.svg'} alt="Close" />
                            </button>
                        </div>
                        <div className="cheering-modal-content">
                            <div className="cheering-modal-info-box">
                                <span className="info-text-yellow">노란색</span>
                                <span className="info-text">은 노래 가사를 같이, </span>
                                <span className="info-text-blue">파란색</span>
                                <span className="info-text">은 응원법만 크게 외치기</span>
                            </div>
                            {selectedItem.youtube_url && (
                                <div className="cheering-modal-youtube">
                                    <iframe
                                        src={getYoutubeEmbedUrl(selectedItem.youtube_url)}
                                        title={selectedItem.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                            <div className="cheering-modal-lyrics">
                                {parseChant(selectedItem.chant)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cheering;
