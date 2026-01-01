import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

type MVMeta = {
    id: string;
    title: string;
    releasedAt: string;
}

const MV_LIST: MVMeta[] = [
    { id: "JgoHQJQ1ORY", title: "Kim Sung Kyu(김성규) _ 60Sec (60초) MV", releasedAt: '2012. 11. 19.' },
    { id: "MhUlAdcJtuU", title: "김성규 Kim Sung Kyu '60초(60 Sec/60秒)' Music video (Band ver.)", releasedAt: '2012. 12. 10.' },
    { id: "pbzwecIT2nw", title: "김성규 Kim Sung Kyu 'I Need You' Music video", releasedAt: '2012. 12. 18.' },
    { id: "2fBODWRrnWM", title: '김성규 (Kim Sung Kyu) "Kontrol" Official MV', releasedAt: '2015. 5. 11.' },
    { id: "R1DiozFguJg", title: '김성규 (Kim Sung Kyu) "너여야만 해" Official MV', releasedAt: '2015. 5. 11.' },
    { id: "jt3Vdwrbhig", title: "[MV] Kim Sung Kyu (김성규) _ True Love", releasedAt: '2018. 2. 26.' },
    { id: "5wXEXz6t2Qo", title: "[MV] Kim Sung Kyu(김성규) _ Don't move(머물러줘) (SHINE Live ver)", releasedAt: '2018. 5. 14.' },
    { id: "vqfBr2qBMAM", title: "[MV] Kim Sung kyu(김성규) _ Sorry", releasedAt: '2018. 8. 22.' },
    { id: "TI70x0jEZA0", title: "[MV] Kim Sung Kyu(김성규) - Beautiful | Oh My Baby 오 마이 베이비 OST", releasedAt: '2020. 6. 10.' },
    { id: "AFl4UZc3LEA", title: "김성규(Kim Sung Kyu) 'I'm Cold' MV", releasedAt: '2020. 12. 14.' },
    { id: "hDvaqF6Kvjpc", title: "김성규(Kim Sung Kyu) 'HUSH' MV", releasedAt: '2021. 3. 29.' },
    { id: "r5WzI1Jm5z0", title: "[MV] Kim Yong Jun(김용준),Kim Sung Kyu(김성규) _ When it snows(눈이 내리면)", releasedAt: '2021. 12. 13.' },
    { id: "dr8h26nozhY", title: "[백수세끼 OST] 김성규 (Kim Sung Kyu) - 'Ready To Go' MV", releasedAt: '2022. 1. 5.' },
    { id: "8cbbipzif5w", title: "[Official MV] 김성규(Kim Sung Kyu) 'Savior'", releasedAt: '2022. 4. 22.' },
    { id: "uVD-Dnd511A", title: "[M/V] 김성규 - My Everyday Is You :: 개미가 타고 있어요(Stock Struck) OST Part.1", releasedAt: '2022. 8. 20.' },
    { id: '6WNrmU5f8Gs', title: "[Official MV] 김성규 'Small Talk'", releasedAt: '2023. 06. 28.' },
    { id: "ItuBFmafOJU", title: "김성규, 남우현 - Beautiful (사주왕 OST) [Music Video]", releasedAt: '2024. 3. 15.' },
];

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