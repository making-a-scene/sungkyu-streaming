import React from 'react';
import '../../App.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SubMenu from '../../components/SubMenu';

const IdGeneration = () => {

    const guideMenus =  [
        { label: '아이디', path: '/guide/id-generation', disabled: false },
        { label: '스트리밍', path: '/guide/streaming', disabled: true },
        { label: '다운로드', path: '/guide/download', disabled: true },
        { label: '음악방송', path: '/guide/music-broadcast' },
        { label: '투표', path: '/guide/vote' },
        { label: '선물하기', path: '/guide/gift', disabled: true },
        { label: 'MV', path: '/guide/mv', disabled: true },
        { label: '숏폼·SNS', path: '/guide/shorts-sns', disabled: true },
        { label: '라디오', path: '/guide/radio', disabled: true },
        { label: '컬러링', path: '/guide/coloring', disabled: true }
    ];

    return (
        <div className="app">
            <Header />
            <SubMenu menuItems={guideMenus} />
            <main className="main-content">
                <img src={process.env.PUBLIC_URL + '/guide-genie-music-sharing.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
            </main>
            <Footer />
        </div>
    );
}

export default IdGeneration;
