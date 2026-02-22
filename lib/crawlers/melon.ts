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

const MELON_CHARTS = [
  { name: '멜론 TOP 100', url: 'https://www.melon.com/chart/index.htm' },
  { name: '멜론 HOT 100(30일)', url: 'https://www.melon.com/chart/hot100/index.htm?chartType=D30' },
  { name: '멜론 HOT 100(100일)', url: 'https://www.melon.com/chart/hot100/index.htm?chartType=D100' },
];

async function fetchMelonChart(url: string): Promise<ChartEntry[]> {
  const { data: html } = await axios.get(url, { headers: HEADERS });
  const $ = cheerio.load(html);
  const chart: ChartEntry[] = [];

  $('.service_list_song tr.lst50, .service_list_song tr.lst100').each((i, el) => {
    const title = $(el).find('.rank01 span a').first().text().trim();
    const artist = $(el).find('.rank02 span a').first().text().trim();
    if (title && artist) {
      chart.push({ rank: i + 1, title, artist });
    }
  });

  return chart;
}

export async function crawlMelon(artist: string): Promise<ChartResult[]> {
  const results = await Promise.all(
    MELON_CHARTS.map(async ({ name, url }) => {
      const chart = await fetchMelonChart(url);
      return {
        chart_name: name,
        artist_ranks: chart.filter((entry) => entry.artist === artist),
      };
    })
  );
  return results;
}
