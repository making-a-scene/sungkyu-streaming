import axios from 'axios';
import * as cheerio from 'cheerio';

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
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export async function crawlBugs(artist: string): Promise<ChartResult> {
  const { data: html } = await axios.get('https://music.bugs.co.kr/chart', {
    headers: HEADERS,
  });
  const $ = cheerio.load(html);
  const chart: ChartEntry[] = [];

  const titles = $('p.title');
  const artists = $('p.artist');

  titles.each((i, el) => {
    const title = $(el).text().trim().split('\n')[0];
    const artistName = $(artists[i]).text().trim().split('\n')[0];
    chart.push({ rank: i + 1, title, artist: artistName });
  });

  return {
    chart_name: '벅스',
    artist_ranks: chart.filter((entry) => entry.artist === artist),
  };
}
