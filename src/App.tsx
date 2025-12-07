import React from 'react';
import './App.css';

// Header Component
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/Group.svg'} alt="Logo" className="logo-icon" />
        <div className="logo-text">
          SUNGKYU<br/>STREAM
        </div>
      </div>
      <button className="menu-button">
        <img src={process.env.PUBLIC_URL + '/Menu Icon 1.svg'} alt="Menu" className="menu-icon" />
      </button>
    </header>
  );
};

// Notification Banner Component
const NotificationBanner: React.FC = () => {
  return (
    <div className="notification-banner">
      <img src={process.env.PUBLIC_URL + '/Announce Megaphone 1.svg'} alt="Notification" className="notification-icon" />
      <div className="notification-text">
        음총팀 카카오톡 채널을 추가하고 빠르게 소식을 받아보세요!
      </div>
      <a href="#" className="notification-link">바로가기</a>
      <button className="close-button">
        <img src={process.env.PUBLIC_URL + '/Close Icon (1) 1.svg'} alt="Close" className="close-icon" />
      </button>
    </div>
  );
};

// Guide Card Component
interface GuideCardProps {
  title: string;
  iconSrc: string;
  isActive: boolean;
  isSpecial?: boolean;
}

const GuideCard: React.FC<GuideCardProps> = ({ title, iconSrc, isActive, isSpecial }) => {
  return (
    <div className={`guide-card ${isActive ? 'active' : 'inactive'} ${isSpecial ? 'special' : ''}`}>
      <div className="guide-title">{title}</div>
      <img src={iconSrc} alt={title} className="guide-icon" />
      {!isActive && <div className="hover-message">12월 중 업로드 예정</div>}
    </div>
  );
};

// Guide Grid Component
const GuideGrid: React.FC = () => {
  const guides = [
    { title: '아이디 생성\n가이드', iconSrc: process.env.PUBLIC_URL + '/identified 1.svg', isActive: false, isSpecial: false },
    { title: '스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/Music Icon (1) 1.svg', isActive: false, isSpecial: false },
    { title: '다운로드\n가이드', iconSrc: process.env.PUBLIC_URL + '/Music Icon (2) 1.svg', isActive: false, isSpecial: false },
    { title: '음악방송\n가이드', iconSrc: process.env.PUBLIC_URL + '/trophy (1) 1.svg', isActive: true, isSpecial: false },
    { title: '투표\n가이드', iconSrc: process.env.PUBLIC_URL + '/Vote Icon 1.svg', isActive: true, isSpecial: false },
    { title: '숏폼·SNS\n가이드', iconSrc: process.env.PUBLIC_URL + '/trending-topic 1.svg', isActive: false, isSpecial: true },
    { title: 'MV 스트리밍\n가이드', iconSrc: process.env.PUBLIC_URL + '/Video Media Player 1.svg', isActive: false, isSpecial: false },
    { title: '라디오\n가이드', iconSrc: process.env.PUBLIC_URL + '/005-podcast 1.svg', isActive: false, isSpecial: false },
    { title: '컬러링\n가이드', iconSrc: process.env.PUBLIC_URL + '/Call Icon (1) 1.svg', isActive: false, isSpecial: false },
    { title: '선물하기\n가이드', iconSrc: process.env.PUBLIC_URL + '/Gift Chocolate Box 1.svg', isActive: false, isSpecial: false },
  ];

  return (
    <div className="guide-grid">
      {guides.map((guide, index) => (
        <GuideCard
          key={index}
          title={guide.title}
          iconSrc={guide.iconSrc}
          isActive={guide.isActive}
          isSpecial={guide.isSpecial}
        />
      ))}
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#" className="social-icon">
          <img src={process.env.PUBLIC_URL + '/xlogo 1.svg'} alt="X (Twitter)" className="social-icon-img" />
        </a>
        <a href="#" className="social-icon">
          <img src={process.env.PUBLIC_URL + '/image 85.svg'} alt="Messenger" className="social-icon-img" />
        </a>
      </div>
      <div className="footer-info">
        <div className="footer-title">김성규 음원총공팀</div>
        <div className="footer-email">sungkyustream@gmail.com</div>
        <div className="footer-copyright">© sungkyustream 2025</div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <NotificationBanner />
        <GuideGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
