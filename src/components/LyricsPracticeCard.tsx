import { Link } from "react-router-dom";
import "../pages/lyricsPractice.css";

const LyricsPracticeCard = () => (
  <Link to="/lyrics-practice" className="lyrics-practice-card">
    <img
      src={process.env.PUBLIC_URL + "/lyrics-icon-filled.svg"}
      alt=""
      className="lyrics-practice-card-icon"
    />
    <span className="lyrics-practice-card-text">
      부락 대비 응원법 · 떼창 가사 퀴즈
    </span>
    <span className="lyrics-practice-card-arrow" aria-hidden="true">
      <img
        src={process.env.PUBLIC_URL + "/arrow-icon.svg"}
        alt=""
        className="announcement-link-arrow"
      />
    </span>
  </Link>
);

export default LyricsPracticeCard;
