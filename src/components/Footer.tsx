import React from 'react';
import '../App.css';
import SocialIcons from './SocialIcons';

// Footer Component
const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-social-icons">
                <SocialIcons/>
            </div>
            <div className="footer-info">
                <div className="footer-copyright">© 김성규 음원총공팀 sungkyustream 2025</div>
            </div>
        </footer>
    );
};

export default Footer;