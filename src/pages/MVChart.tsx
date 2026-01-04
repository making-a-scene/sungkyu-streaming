import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ChartMenu from "../components/ChartMenu";
import NotificationBanner from "../components/NotificationBanner";

type MVMeta = {
    id: string;
    title: string;
    releasedAt: string;
    duration: string;
}

const MV_LIST: MVMeta[] = [
    { id: "JgoHQJQ1ORY", title: "Kim Sung Kyu(김성규) _ 60Sec (60초) MV", releasedAt: '2012-11-19', duration: '4:08' },
    { id: "MhUlAdcJtuU", title: "김성규 Kim Sung Kyu '60초(60 Sec/60秒)' Music video (Band ver.)", releasedAt: '2012-12-10', duration: '3:36' },
    { id: "pbzwecIT2nw", title: "김성규 Kim Sung Kyu 'I Need You' Music video", releasedAt: '2012-12-18', duration: '3:36' },
    { id: "2fBODWRrnWM", title: '김성규 (Kim Sung Kyu) "Kontrol" Official MV', releasedAt: '2015-05-11', duration: '3:58' },
    { id: "R1DiozFguJg", title: '김성규 (Kim Sung Kyu) "너여야만 해" Official MV', releasedAt: '2015-05-11', duration: '3:46' },
    { id: "jt3Vdwrbhig", title: "[MV] Kim Sung Kyu (김성규) _ True Love", releasedAt: '2018-02-26', duration: '3:44' },
    { id: "5wXEXz6t2Qo", title: "[MV] Kim Sung Kyu(김성규) _ Don't move(머물러줘) (SHINE Live ver)", releasedAt: '2018-05-14', duration: '5:24' },
    { id: "vqfBr2qBMAM", title: "[MV] Kim Sung kyu(김성규) _ Sorry", releasedAt: '2018-08-22', duration: '5:23' },
    { id: "TI70x0jEZA0", title: "[MV] Kim Sung Kyu(김성규) - Beautiful | Oh My Baby 오 마이 베이비 OST", releasedAt: '2020-06-10', duration: '4:10' },
    { id: "AFl4UZc3LEA", title: "김성규(Kim Sung Kyu) 'I'm Cold' MV", releasedAt: '2020-12-14', duration: '4:05' },
    { id: "DvaqF6Kvjpc", title: "김성규(Kim Sung Kyu) 'HUSH' MV", releasedAt: '2021-03-29', duration: '4:08' },
    { id: "r5WzI1Jm5z0", title: "[MV] Kim Yong Jun(김용준),Kim Sung Kyu(김성규) _ When it snows(눈이 내리면)", releasedAt: '2021-12-13', duration: '2:58' },
    { id: "dr8h26nozhY", title: "[백수세끼 OST] 김성규 (Kim Sung Kyu) - 'Ready To Go' MV", releasedAt: '2022-01-05', duration: '3:30' },
    { id: "8cbbipzif5w", title: "[Official MV] 김성규(Kim Sung Kyu) 'Savior'", releasedAt: '2022-04-22', duration: '3:38' },
    { id: "uVD-Dnd511A", title: "[M/V] 김성규 - My Everyday Is You :: 개미가 타고 있어요(Stock Struck) OST Part.1", releasedAt: '2022-08-20', duration: '3:16' },
    { id: '6WNrmU5f8Gs', title: "[Official MV] 김성규 'Small Talk'", releasedAt: '2023-06-28', duration: '4:17' },
    { id: "ItuBFmafOJU", title: "김성규, 남우현 - Beautiful (사주왕 OST) [Music Video]", releasedAt: '2024-03-15', duration: '3:04' },
];

type MVStatistics = {
    id: string;
    viewCount: number;
}

type MVItem = MVMeta & MVStatistics;

type SortType = 'viewCount' | 'latest';

const MVChart: React.FC = () => {
    const [mvItems, setMvItems] = useState<MVItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState<SortType>('viewCount');

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

                setMvItems(merged);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // YYYY-MM-DD를 한국식 날짜 형식으로 변환
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}. ${month}. ${day}.`;
    };

    // 정렬된 목록
    const sortedItems = [...mvItems].sort((a, b) => {
        if (sortType === 'viewCount') {
            return b.viewCount - a.viewCount;
        } else {
            // 최신순 (releasedAt 기준)
            return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime();
        }
    });

    return (
        <div className="app">
            <Header />
            <ChartMenu />
            <NotificationBanner />
            <main className="main-content">
                {!loading && (
                    <div className="mv-header">
                        <div className="mv-count">총 {mvItems.length}개의 영상</div>
                        <div className="mv-sort-toggle">
                            <button
                                className={`sort-button ${sortType === 'viewCount' ? 'active' : ''}`}
                                onClick={() => setSortType('viewCount')}
                            >
                                조회수
                            </button>
                            <button
                                className={`sort-button ${sortType === 'latest' ? 'active' : ''}`}
                                onClick={() => setSortType('latest')}
                            >
                                최신순
                            </button>
                        </div>
                    </div>
                )}
                {!loading && sortedItems.map((mv, idx) => (
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
                            <div className="mv-duration">{mv.duration}</div>
                        </div>

                        <div className="mv-info">
                            <div className="mv-title">{mv.title}</div>
                            <div className="mv-released-date">{formatDate(mv.releasedAt)}</div>
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