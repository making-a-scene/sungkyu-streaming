import React from "react";
import GuideGrid from "../components/GuideGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const Guide = () => {
    return (
        <div className="app">
            <Header />
            <PageTitle icon="/guide-icon-filled.svg" title="가이드" />
            <main className="main-content">
                <div className="guide-page-content">
                    <GuideGrid />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Guide;