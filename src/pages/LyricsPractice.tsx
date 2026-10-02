import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import './lyricsPractice.css';

const LyricsPractice = () => (
    <div className="app lyrics-selection-page">
        <Header />
        <PageTitle icon="/lyrics-icon-filled.svg" title="가사 · 응원법 퀴즈" />
        <main className="main-content lyrics-page-content">
            <div className="lyrics-song-selection">
                <p>연습하고 싶은 곡을 선택해 주세요.</p>
                <div className="cheering-list">
                    <Link to="/lyrics-practice/60-seconds" className="cheering-item lyrics-quiz-song">
                        <div className="cheering-item-left">
                            <div className="cheering-item-album"><img src={process.env.PUBLIC_URL + '/album-another-me.png'} alt="" className="cheering-item-album-img" /></div>
                            <span className="cheering-item-title">60초</span>
                        </div>
                        <div className="cheering-item-right">
                            <span className="cheering-item-badge fanchat">응원법</span>
                            <img src={process.env.PUBLIC_URL + '/arrow-icon.svg'} alt="" className="cheering-item-arrow" />
                        </div>
                    </Link>
                    <div className="cheering-item lyrics-quiz-song lyrics-quiz-song-pending" aria-disabled="true" aria-label="Shine 떼창곡, 게임 준비 중">
                        <div className="cheering-item-left">
                            <div className="cheering-item-album"><img src={process.env.PUBLIC_URL + '/album-another-me.png'} alt="" className="cheering-item-album-img" /></div>
                            <span className="cheering-item-title">Shine</span>
                        </div>
                        <div className="cheering-item-right">
                            <span className="lyrics-song-pending-label">준비 중</span>
                            <span className="cheering-item-badge chorus">떼창곡</span>
                            <img src={process.env.PUBLIC_URL + '/arrow-icon.svg'} alt="" className="cheering-item-arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
export default LyricsPractice;
