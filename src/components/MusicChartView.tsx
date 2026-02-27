import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartCard, { type ChartEntry } from './ChartCard';
import '../App.css';

interface ChartResult {
    chart_name: string;
    artist_ranks: ChartEntry[];
}

interface CrawlData {
    updated_at: string;
    charts: ChartResult[];
}

type FilterType = 'all' | 'melon' | 'genie' | 'bugs' | 'flo' | 'vibe';

const FILTERS: { label: string; value: FilterType }[] = [
    { label: '전체', value: 'all' },
    { label: '멜론', value: 'melon' },
    { label: '지니', value: 'genie' },
    { label: '벅스', value: 'bugs' },
    { label: '플로', value: 'flo' },
    { label: '바이브', value: 'vibe' },
];

const PLATFORM_KEYWORDS: [string, FilterType][] = [
    ['멜론', 'melon'],
    ['지니', 'genie'],
    ['벅스', 'bugs'],
    ['플로', 'flo'],
    ['바이브', 'vibe'],
];

function getPlatform(chartName: string): FilterType {
    for (const [keyword, platform] of PLATFORM_KEYWORDS) {
        if (chartName.includes(keyword)) return platform;
    }
    return 'all';
}

function getPrevHourAt(updatedAt: string): string {
    // updatedAt: "2026-02-24 20:28"
    const [datePart, timePart] = updatedAt.split(' ');
    const hour = parseInt(timePart.split(':')[0]);

    if (hour === 0) {
        const date = new Date(datePart + 'T00:00:00+09:00');
        date.setDate(date.getDate() - 1);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}T23`;
    }

    return `${datePart}T${String(hour - 1).padStart(2, '0')}`;
}

const MusicChartView: React.FC = () => {
    const [chartData, setChartData] = useState<CrawlData | null>(null);
    const [prevData, setPrevData] = useState<CrawlData | null>(null);
    const [filter, setFilter] = useState<FilterType>('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/charts');
                const current: CrawlData = res.data;
                setChartData(current);

                try {
                    const prevAt = getPrevHourAt(current.updated_at);
                    const prevRes = await axios.get(`/api/charts?at=${prevAt}`);
                    setPrevData(prevRes.data);
                } catch {
                    // 이전 시간 데이터 없을 수 있음
                }
            } catch (err) {
                console.error('Failed to fetch chart data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || !chartData) return null;

    const filteredCharts = chartData.charts.filter(chart => {
        if (filter === 'all') return true;
        return getPlatform(chart.chart_name) === filter;
    });

    const findPrevSongs = (chartName: string): ChartEntry[] | undefined => {
        if (!prevData) return undefined;
        return prevData.charts.find(c => c.chart_name === chartName)?.artist_ranks;
    };

    return (
        <div className="music-chart-content">
            <div className="chart-filter-pills">
                {FILTERS.map(f => (
                    <div
                        key={f.value}
                        className={`chart-filter-pill ${filter === f.value ? 'active' : ''}`}
                        onClick={() => setFilter(f.value)}
                    >
                        {f.label}
                    </div>
                ))}
            </div>
            <div className="chart-cards">
                {filteredCharts.map(chart => (
                    <ChartCard
                        key={chart.chart_name}
                        chartName={chart.chart_name}
                        songs={chart.artist_ranks}
                        updatedAt={chartData.updated_at}
                        prevSongs={findPrevSongs(chart.chart_name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MusicChartView;
