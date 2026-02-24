import axios from 'axios';

interface ChartEntry {
  rank: number;
  title: string;
  artist: string;
}

interface ChartResult {
  chart_name: string;
  artist_ranks: ChartEntry[];
}

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36',
  Accept: 'application/json',
};

const VIBE_CHARTS = [
  { name: '바이브 Top 100', url: 'https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total?start=1&display=100' },
  { name: '바이브 국내 급상승', url: 'https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/domestic?start=1&display=100' }
]

async function fetchVibeChart(url: string): Promise<ChartEntry[]> {
  const { data } = await axios.get(url, { headers: HEADERS });

  const tracks = data.response.result.chart.items.tracks;
  const chart: ChartEntry[] = tracks.map((item: any, i: number) => ({
    rank: i + 1,
    title: item.trackTitle,
    artist: item.artists[0].artistName,
  }));

  return chart;
}

export async function crawlVibe(artist: string): Promise<ChartResult[]> {
  const results = await Promise.all(
      VIBE_CHARTS.map(async ({ name, url }) => {
        const chart = await fetchVibeChart(url);
        return {
          chart_name: name,
          artist_ranks: chart.filter((entry) => entry.artist === artist)
        };
      })
  );
  return results;
}