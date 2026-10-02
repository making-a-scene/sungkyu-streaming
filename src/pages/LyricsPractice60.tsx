import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LyricsGame from '../components/LyricsGame';
import './lyricsPractice.css';

const LyricsPractice60 = () => (
    <div className="app">
        <Header />
        <main className="main-content lyrics-page-content" aria-label="60초 가사·응원법 연습 게임">
            <div className="lyrics-song-back"><Link to="/lyrics-practice">← 다른 곡 선택</Link></div>
            <LyricsGame />
        </main>
        <Footer />
    </div>
);

export default LyricsPractice60;
