import React from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GuideMenu from '../../components/GuideMenu';

const IdGeneration = () => {

    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <main className="main-content">
                <img src={process.env.PUBLIC_URL + '/guide-genie-music-sharing.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
            </main>
            <Footer />
        </div>
    );
}

export default IdGeneration;
