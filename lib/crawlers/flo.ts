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

export async function crawlFlo(artist: string): Promise<ChartResult> {
  const { data } = await axios.get(
    'https://www.music-flo.com/api/display/v1/browser/chart/1/track/list?size=100'
  );

  const trackList = data.data.trackList;
  const chart: ChartEntry[] = trackList.map((track: any, i: number) => ({
    rank: i + 1,
    title: track.name,
    artist: track.artistList[0].name,
  }));

  return {
    chart_name: '플로',
    artist_ranks: chart.filter((entry) => entry.artist === artist),
  };
}
