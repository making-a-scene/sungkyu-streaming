import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import './lyricsPractice.css';

const LyricsPractice = () => (
    <div className="app">
        <Header />
        <PageTitle icon="/lyrics-icon-filled.svg" title="가사·응원법 게임" />
        <main className="main-content lyrics-page-content">
          <div className="lyrics-song-selection">
            <h1>연습할 곡 선택</h1>
            <p>연습하고 싶은 곡을 선택해 주세요.</p>
            <div className="lyrics-song-list">
                <Link to="/lyrics-practice/60-seconds" className="lyrics-song-card">
                    <img src={process.env.PUBLIC_URL + '/album-another-me.png'} alt="" />
                    <span className="lyrics-song-info">
                        <strong>60초</strong>
                        <span>김성규 · Another Me</span>
                        <span className="lyrics-song-action">게임 시작하기 →</span>
                    </span>
                </Link>
                <div className="lyrics-song-card lyrics-song-card-pending" aria-disabled="true">
                    <img src={process.env.PUBLIC_URL + '/album-another-me.png'} alt="" />
                    <span className="lyrics-song-info">
                        <strong>Shine</strong>
                        <span>김성규 · Another Me</span>
                        <span className="lyrics-practice-badge">준비 중</span>
                    </span>
                </div>
            </div>
          </div>
        </main>
        <Footer />
    </div>
);
export default LyricsPractice;
