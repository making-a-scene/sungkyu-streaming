import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

const LV = () => {
    return (
        <div className="app">
            <Header />
            <PageTitle icon="/lv4-icon-filled.svg" title="LV4" />
            <main className="main-content">

            </main>
            <Footer />
        </div>
    );
}

export default LV;