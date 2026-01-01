import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import SubMenu from "../components/SubMenu";

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

type MVStatistics = {
    id: string;
    viewCount: number;
}

type MVItem = MVMeta & MVStatistics;

const MVChart: React.FC = () => {
    const [mvItems, setMvItems] = useState<MVItem[]>([]);
    const [loading, setLoading] = useState(true);
    const chartMenus = [
        { label: '멜론', path: '/chart/melon', disabled: true },
        { label: '지니', path: '/chart/genie', disabled: true },
        { label: '벅스', path: '/chart/bugs', disabled: true },
        { label: '플로', path: '/chart/flo', disabled: true },
        { label: '바이브', path: '/chart/vibe', disabled: true },
        { label: 'MV', path: '/chart/mv', disabled: false },
        { label: '틱톡', path: '/chart/tiktok', disabled: true },
    ];

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const ids = MV_LIST.map(mv => mv.id).join(',');

                const res = await axios.get(
                    'https://www.googleapis.com/youtube/v3/videos',
                    {
                        params: {
                            part: 'statistics',
                            id: ids,
                            key: 'AIzaSyA-6K53NASBQ-CcD-tYlnlV0e3qVJne9iU',
                        },
                    }
                );

                const statsMap = new Map<string, number>();

                res.data.items.forEach((item: any) => {
                    const views = Number(item.statistics.viewCount ?? 0);
                    statsMap.set(item.id, views);
                });

                const merged: MVItem[] = MV_LIST.map(meta => ({
                    ...meta,
                    viewCount: statsMap.get(meta.id) ?? 0,
                }));

                // 조회수 기준 내림차순 정렬
                merged.sort((a, b) => b.viewCount - a.viewCount);

                setMvItems(merged);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="app">
            <Header />
            <SubMenu menuItems={chartMenus} />
            <main className="main-content">
                {!loading && mvItems.map((mv, idx) => (
                    <div
                        key={mv.id}
                        className="mv-row"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${mv.id}`, '_blank')}
                    >
                        <div className="mv-rank">
                            {idx + 1}
                        </div>

                        <div className="mv-thumb">
                            <img
                                src={`https://i.ytimg.com/vi/${mv.id}/mqdefault.jpg`}
                                alt={mv.title}
                                className="mv-thumb-img"
                            />
                        </div>

                        <div className="mv-info">
                            <div className="mv-title">{mv.title}</div>
                            <div className="mv-views">
                                조회수 {mv.viewCount.toLocaleString()}회
                            </div>
                        </div>
                    </div>
                ))}
            </main>
            <Footer/>
        </div>
    );
};

export default MVChart;