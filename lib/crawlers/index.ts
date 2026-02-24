import { crawlMelon } from './melon';
import { crawlGenie } from './genie';
import { crawlBugs } from './bugs';
import { crawlFlo } from './flo';
import { crawlVibe } from './vibe';
import { crawlYouTube, type YouTubeVideo } from './youtube';

interface ChartEntry {
  rank: number;
  title: string;
  artist: string;
}

export interface ChartResult {
  chart_name: string;
  artist_ranks: ChartEntry[];
}

export interface CrawlData {
  updated_at: string;
  charts: ChartResult[];
  youtube: YouTubeVideo[];
}

function toKSTString(): string {
  return new Date().toLocaleString('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export async function crawlAll(artist = '한로로'): Promise<CrawlData> {
  const [chartResults, youtube] = await Promise.all([
    Promise.allSettled([
      crawlMelon(artist),
      crawlGenie(artist),
      crawlBugs(artist),
      crawlFlo(artist),
      crawlVibe(artist),
    ]),
    crawlYouTube().catch(() => [] as YouTubeVideo[]),
  ]);

  const charts: ChartResult[] = [];

  for (const result of chartResults) {
    if (result.status === 'fulfilled') {
      const value = result.value;
      if (Array.isArray(value)) {
        charts.push(...value);
      } else {
        charts.push(value);
      }
    }
  }

  return {
    updated_at: toKSTString(),
    charts,
    youtube,
  };
}