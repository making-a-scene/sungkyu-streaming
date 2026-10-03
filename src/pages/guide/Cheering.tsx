import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChantModal, { ChantItem } from '../../components/ChantModal';
import GuideMenu from '../../components/GuideMenu';
import { usePreventZoom } from '../../hooks/usePreventZoom';
import chantData from '../../data/sungkyu-chant.json';
import infiniteChantData from '../../data/infinite-chant.json';

type FilterType = 'all' | 'fanchat' | 'chorus' | 'mujip5';
type ArtistType = 'sungkyu' | 'infinite';
type SortOrder = 'asc' | 'desc';



// Album cover mapping


const albumCovers: { [key: string]: string } = {
  'Over It': '/album-otm.png',
  Dreaming: '/album-otm.png',
  '모범답안 (Answer)': '/album-otm.png',
  '60초': '/album-another-me.png',
  Shine: '/album-another-me.png',
  Kontrol: '/album-27.png',
  답가: '/album-27.png',
  'True Love': '/album-10stories.png',
  끌림: '/album-10stories.png',
  "I'm Cold": '/album-inside-me.png',
  "DIVIN'": '/album-inside-me.png',
  Climax: '/album-inside-me.png',
  HUSH: '/album-hush.png',
  You: '/album-hush.png',
  '나의 하루': '/album-hush.png',
  Savior: '/album-project-s.png',
  안개: '/album-project-s.png',
  'Ready To Go': '/album-ready-to-go.png',
  '꼭 (Like a dream)': '/album-like-a-dream.png',
  'Small Talk': '/album-small-talk.png',
  'It Will Be': '/album-small-talk.png',
  '다시 돌아와': '/infinite/infinite-album-first-invasion.jpg',
  "She's Back": '/infinite/infinite-album-first-invasion.jpg',
  'BTD (Before The Dawn)': '/infinite/infinite-album-evolution.jpg',
  "Nothing's Over": '/infinite/infinite-album-inspirit.jpg',
  'Can U Smile': '/infinite/infinite-album-inspirit.jpg',
  내꺼하자: '/infinite/infinite-album-over-the-top.jpg',
  '파라다이스 (Paradise)': '/infinite/infinite-album-paradise.jpg',
  추격자: '/infinite/infinite-album-infinitize.jpg',
  'Man In Love (남자가 사랑할 때)':
    '/infinite/infinite-album-new-challenge.jpg',
  '그리움이 닿는 곳에': '/infinite/infinite-album-new-challenge.jpg',
  Destiny: '/infinite/infinite-album-destiny.jpg',
  'Last Romeo': '/infinite/infinite-album-season-2.jpg',
  소나기: '/infinite/infinite-album-season-2.jpg',
  Back: '/infinite/infinite-album-be-back.jpg',
  Bad: '/infinite/infinite-album-reality.jpg',
  '태풍 (The Eye)': '/infinite/infinite-album-infinite-only.jpg',
  'Tell Me': '/infinite/infinite-album-top-seed.jpg',
  'New Emotions': '/infinite/infinite-album-13egin.jpg',
  Dangerous: '/infinite/infinite-album-like-infinite.jpg',
};

const getAlbumCover = (title: string): string => {
  return albumCovers[title] || '';
};

// Normalize text for search (lowercase, remove spaces)
const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '');
};

const Cheering: React.FC = () => {
  usePreventZoom();

  // const navigate = useNavigate();
  const { artist: artistParam } = useParams();
  const initialArtist: ArtistType = artistParam === 'infinite' ? 'infinite' : 'sungkyu';
  const [filter, setFilter] = useState<FilterType>('all');
  const [artist, setArtist] = useState<ArtistType>(initialArtist);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ChantItem | null>(null);

  useEffect(() => {
    const nextArtist: ArtistType = artistParam === 'infinite' ? 'infinite' : 'sungkyu';
    setArtist(nextArtist);
    setFilter('all');
  }, [artistParam]);

  const activeChantData =
    artist === 'sungkyu'
      ? (chantData as ChantItem[])
      : (infiniteChantData as ChantItem[]);

  const filteredData = activeChantData.filter((item) => {
    // Filter by type
    if (filter === 'fanchat' && !item.is_fanchat) return false;
    if (filter === 'chorus' && item.is_fanchat) return false;
    if (filter === 'mujip5' && item.tag !== '무집5') return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      const titleMatch = normalizeText(item.title).includes(normalizedQuery);
      const aliasMatch = item.aliases.some((alias) =>
        normalizeText(alias).includes(normalizedQuery),
      );
      const chantMatch = normalizeText(item.chant).includes(normalizedQuery);

      if (!titleMatch && !aliasMatch && !chantMatch) return false;
    }

    return true;
  });
  const sortedData =
    [...filteredData].sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleItemClick = (item: ChantItem) => setSelectedItem(item);
  const handleCloseModal = () => setSelectedItem(null);

  // const handleArtistToggle = () => {
  //   const nextArtist = artist === 'sungkyu' ? 'infinite' : 'sungkyu';
  //   navigate(`/guide/cheering/${nextArtist}`);
  // };

  return (
    <div className="app">
      <Header />
      <GuideMenu />
      <main className="main-content cheering-main">
        <div className="cheering-search-container">
          <div className="cheering-search-box">
            <img
              src={process.env.PUBLIC_URL + '/search-icon.svg'}
              alt="Search"
              className="cheering-search-icon"
            />
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
              <button
                className={`cheering-filter-tab ${filter === 'fanchat' ? 'active' : ''}`}
                onClick={() => setFilter('fanchat')}
              >
                응원법
              </button>
              {artist === 'sungkyu' && (
                <>
                  <button
                    className={`cheering-filter-tab ${filter === 'chorus' ? 'active' : ''}`}
                    onClick={() => setFilter('chorus')}
                  >
                    떼창곡
                  </button>
                </>
              )}
              {artist === 'infinite' && (
                <button
                  className={`cheering-filter-tab ${filter === 'mujip5' ? 'active' : ''}`}
                  onClick={() => setFilter('mujip5')}
                >
                  무집5
                </button>
              )}
            </div>
            {/* <button
              type="button"
              className={`cheering-artist-toggle ${artist}`}
              aria-label={`응원법 가수 선택: 현재 ${artist === 'sungkyu' ? '성규' : '인피니트'}`}
              onClick={handleArtistToggle}
            >
              <span
                className={`cheering-artist-toggle-button ${artist === 'sungkyu' ? 'active' : ''}`}
              >
                성규
              </span>
              <span
                className={`cheering-artist-toggle-button ${artist === 'infinite' ? 'active' : ''}`}
              >
                인피니트
              </span>
            </button> */}
          </div>
        </div>
        <div className="cheering-list-meta">
          <span className="cheering-list-count">총 {filteredData.length}개</span>
          <button
            type="button"
            className="cheering-sort-button"
            onClick={() =>
              setSortOrder((current) =>
                current === 'asc' ? 'desc' : 'asc',
              )
            }
            aria-label={
              sortOrder === 'asc'
                ? '발매순 내림차순 정렬로 변경'
                : '발매순 오름차순 정렬로 변경'
            }
          >
            발매순
            <span
              className={`cheering-sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`}
              aria-hidden="true"
            >
              ↑
            </span>
          </button>
        </div>
        <div className="cheering-list">
          {sortedData.map((item) => (
            <div
              key={item.title}
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
                {item.tag && (
                  <span className="cheering-song-tag">{item.tag}</span>
                )}
                <span
                  className={`cheering-item-badge ${item.is_fanchat ? 'fanchat' : 'chorus'}`}
                >
                  {item.is_fanchat ? '응원법' : '떼창곡'}
                </span>
                <img
                  src={process.env.PUBLIC_URL + '/arrow-icon.svg'}
                  alt="Arrow"
                  className="cheering-item-arrow"
                />
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

      {selectedItem && <ChantModal item={selectedItem} onClose={handleCloseModal} />}
    </div>
  );
};

export default Cheering;
