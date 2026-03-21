import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import axios from "axios";
import MusicChartView from "../components/MusicChartView";

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
    { id: "AdOaQpwYx0c", title: "[Official Video] 김성규 (KIM SUNG KYU) 'Over It' Pre-Release", releasedAt: '2026-02-21', duration: '3:34' },
    { id: "bK_1FZYO0pg", title: "[김성규 (KIM SUNG KYU) '널 떠올리면 (When I think about you)' MV\n", releasedAt: '2026-03-02', duration: '4:37' }
];

type MVStatistics = {
    id: string;
    viewCount: number;
}

type MVItem = MVMeta & MVStatistics;

type SortType = 'viewCount' | 'latest';
type ChartTab = 'music' | 'mv';

const Chart: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ChartTab>('music');

    // MV 차트 상태
    const [mvItems, setMvItems] = useState<MVItem[]>([]);
    const [mvLoading, setMvLoading] = useState(false);
    const [mvLoaded, setMvLoaded] = useState(false);
    const [sortType, setSortType] = useState<SortType>('viewCount');

    // MV 탭 선택 시에만 데이터 로드
    useEffect(() => {
        if (activeTab === 'mv' && !mvLoaded) {
            const fetchStats = async () => {
                setMvLoading(true);
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
                    setMvLoaded(true);
                } finally {
                    setMvLoading(false);
                }
            };
            fetchStats();
        }
    }, [activeTab, mvLoaded]);

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}. ${month}. ${day}.`;
    };

    const sortedMvItems = [...mvItems].sort((a, b) => {
        if (sortType === 'viewCount') {
            return b.viewCount - a.viewCount;
        } else {
            return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime();
        }
    });

    return (
        <div className="app">
            <Header />
            <PageTitle icon="/chart-icon-filled.svg" title="차트" />
            <main className="main-content chart-main">
                <div className="chart-tab-bar">
                    <div
                        className={`chart-tab ${activeTab === 'music' ? 'active' : ''}`}
                        onClick={() => setActiveTab('music')}
                    >
                        <span className="chart-tab-text">음원 차트</span>
                        {activeTab === 'music' && <div className="chart-tab-indicator" />}
                    </div>
                    <div
                        className={`chart-tab ${activeTab === 'mv' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mv')}
                    >
                        <span className="chart-tab-text">MV 차트</span>
                        {activeTab === 'mv' && <div className="chart-tab-indicator" />}
                    </div>
                </div>

                {activeTab === 'music' && <MusicChartView />}

                {activeTab === 'mv' && (
                    <div className="mv-content">
                        {!mvLoading && mvLoaded && (
                            <>
                                <div className="mv-sort-toggle">
                                    <button
                                        className={`mv-sort-btn ${sortType === 'viewCount' ? 'active' : ''}`}
                                        onClick={() => setSortType('viewCount')}
                                    >
                                        조회수순
                                    </button>
                                    <button
                                        className={`mv-sort-btn ${sortType === 'latest' ? 'active' : ''}`}
                                        onClick={() => setSortType('latest')}
                                    >
                                        최신순
                                    </button>
                                </div>
                                <div className="mv-list">
                                    {sortedMvItems.map((mv, idx) => (
                                        <div
                                            key={mv.id}
                                            className="mv-row"
                                            onClick={() => window.open(`https://www.youtube.com/watch?v=${mv.id}`, '_blank')}
                                        >
                                            <div className="mv-rank">{idx + 1}</div>
                                            <div className="mv-row-body">
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
                                                        <span>조회수</span> <span>{mv.viewCount.toLocaleString()}회</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default Chart;
