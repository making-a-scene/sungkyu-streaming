import React from "react";
import CheeringGuideBanner from "../components/CheeringGuideBanner";
import GuideGrid from "../components/GuideGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Guide = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="guide-page-content">
                    <GuideGrid />
                    <CheeringGuideBanner />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Guide;