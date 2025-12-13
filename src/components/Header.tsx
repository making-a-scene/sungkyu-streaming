import React from 'react';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';

interface HeaderProps {
    onNavigate?: (page: string) => void;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const handleLogoClick = () => {
        if (onNavigate) {
            onNavigate('home');
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText("sungkyustream@gmail.com");
            toast.success("이메일 주소가 클립보드에 복사되었습니다!");
        } catch (e) {
            toast.error("이메일 주소 복사에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}>
                <img src={process.env.PUBLIC_URL + 'logo.svg'} alt="Logo" className="logo-icon" />
            </div>
            <div className="header-menu">
                <div className="header-menu-item active">
                    <img src={process.env.PUBLIC_URL + '홈.svg'} alt="Home" className="header-menu-icon"/>
                    <span className="header-menu-text">홈</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '가이드.svg'} alt="Guide" className="header-menu-icon"/>
                    <span className="header-menu-text">가이드</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '스케줄.svg'} alt="Schedule" className="header-menu-icon"/>
                    <span className="header-menu-text">스케줄</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '차트.svg'} alt="Chart" className="header-menu-icon"/>
                    <span className="header-menu-text">차트</span>
                    <span className="tooltip-text">준비중</span>
                </div>
                <div className="header-menu-item inactive">
                    <img src={process.env.PUBLIC_URL + '지원하기.svg'} alt="Apply" className="header-menu-icon"/>
                    <span className="header-menu-text">지원하기</span>
                    <span className="tooltip-text">준비중</span>
                </div>
            </div>
            <div className="social-icons">
                <img src={process.env.PUBLIC_URL + 'email.svg'} alt="Email" className="header-social-icon header-social-icon-email"
                    onClick={(e) => copyEmail()}/>
                    <ToastContainer />
                <a href="https://x.com/sungkyustream" className="header-social-icon">
                    <img src={process.env.PUBLIC_URL + 'xlogo.svg'} alt="X" className="header-social-icon header-social-icon-x" />
                </a>
            </div>
        </header>
    );
};

export default Header;