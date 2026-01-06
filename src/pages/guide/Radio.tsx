import React from "react";
import Header from "../../components/Header";
import GuideMenu from "../../components/GuideMenu";
import Footer from "../../components/Footer";

const Radio = () => {
    return (
        <div className="app">
            <Header />
            <GuideMenu />
            <main className="main-content">
                <img src={process.env.PUBLIC_URL + '/guide-radio.png'} alt="guide" style={{ width: '100%', maxWidth: '880px', display: 'block' }} />
            </main>
            <Footer />
        </div>
    );
}

export default Radio;
