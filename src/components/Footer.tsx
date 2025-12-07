import React from 'react';
import '../App.css';

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

export default Footer;