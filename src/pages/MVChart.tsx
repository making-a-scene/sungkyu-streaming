import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

interface MVItem {
    id: string;
    statistics: {
        viewCount: string;
        favoriteCount: string;
        commentCount: string;
    }
}

const MVChart: React.FC = () => {
    const [mvInfo, setMVinfo] = useState<MVItem | null>(null);

    useEffect(() => {
        axios
            .get(
                "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=6WNrmU5f8Gs&key=AIzaSyA-6K53NASBQ-CcD-tYlnlV0e3qVJne9iU"
            )
            .then((res) => {
                setMVinfo(res.data.items[0]);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <iframe width="100%" height="500" src="https://www.youtube.com/embed/6WNrmU5f8Gs?si=YHFeUO6ZLpz1HcSy"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>
                <span className="notification-text">현재 조회수: {mvInfo?.statistics?.viewCount?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}회</span>
            </main>
            <Footer/>
        </div>
    );
};

export default MVChart;