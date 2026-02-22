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
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
};

async function fetchGeniePage(page: number): Promise<ChartEntry[]> {
  const url = `https://www.genie.co.kr/chart/top200?ditc=D&rtm=Y&pg=${page}`;
  const { data: html } = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(html);
  const chart: ChartEntry[] = [];

  const table = $('table.list-wrap');
  const titles = table.find('a.title.ellipsis');
  const artists = table.find('a.artist.ellipsis');

  titles.each((j, el) => {
    const title = $(el).text().trim();
    const artist = $(artists[j]).text().trim();
    chart.push({
      rank: (page - 1) * 50 + j + 1,
      title,
      artist,
    });
  });

  return chart;
}

export async function crawlGenie(artist: string): Promise<ChartResult> {
  const pages = await Promise.all([1, 2, 3, 4].map(fetchGeniePage));
  const chart = pages.flat();

  return {
    chart_name: '지니 TOP 200',
    artist_ranks: chart.filter((entry) => entry.artist === artist),
  };
}
