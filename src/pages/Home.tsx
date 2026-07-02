import React, { useState } from 'react';
import '../App.css';
import '../components/event/event.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import YoutubeBanner from '../components/YoutubeBanner';
import ActionButtons from '../components/ActionButtons';
import AnnouncementSection from '../components/AnnouncementSection';
import StreamingPills from '../components/StreamingPills';
import StreamingCounter from '../components/StreamingCounter';
import RadioSchedule from '../components/RadioSchedule';
import GuideGrid from '../components/GuideGrid';

import LanguageToggle from '../components/event/LanguageToggle';
import EventNotice from '../components/event/EventNotice';
import EventEntrySection from '../components/event/EventEntrySection';
import { eventMessages, getStoredLang, storeLang, type Lang } from '../data/eventLocale';

const HERO_BANNER = process.env.PUBLIC_URL + '/event/00f7b9f14ae9f0ff07650d2594b53fec2ee5fec5.png';

// 연장된 모집 마감 시각 (KST): 7/5(일) 23:59
const RECRUIT_DEADLINE = new Date('2026-07-05T23:59:59+09:00');

const Home: React.FC = () => {
  const [lang, setLang] = useState<Lang>(getStoredLang);
  const messages = eventMessages[lang];

  const handleLangChange = (l: Lang) => {
    setLang(l);
    storeLang(l);
  };

  return (
    <div className="app">
      <Header />

      {/* ===== LV4 이벤트 영역 (신규, 4개국어) — 기존 홈 위에 얹음 ===== */}
      <div className="event-hero-banner">
        <img src={HERO_BANNER} alt="LEAP TO VECTOR" />
      </div>
      <section className="event-hero">
        <LanguageToggle lang={lang} onChange={handleLangChange} />
        <EventNotice messages={messages} deadline={RECRUIT_DEADLINE} />
        <EventEntrySection messages={messages} />
      </section>

      {/* ===== 기존 홈 콘텐츠 (그대로) ===== */}
      <main className="home-content">
        <div className="home-top-group">
          <YoutubeBanner youtubeSrc="https://www.youtube.com/embed/bK_1FZYO0pg" />
          <div className="home-countdown-section">
            <ActionButtons />
          </div>
        </div>
        <div className="home-bottom-group">
          <AnnouncementSection />
          <StreamingPills />
          <StreamingCounter releaseKST={new Date('2026-03-02T18:00:00+09:00')} songName="널 떠올리면" />
          <RadioSchedule />
          <div className="home-guide-section">
            <h2 className="home-section-title">음원 총공 방법이 궁금하다면!</h2>
            <div className="home-guide-content">
              <GuideGrid />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
