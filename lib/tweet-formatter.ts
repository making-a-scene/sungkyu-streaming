import type { CrawlData } from './crawlers';

const TITLE_SONG = '널 떠올리면';

function findTitleSongRank(
  chart: { chart_name: string; artist_ranks: { rank: number; title: string; artist: string }[] },
): number | null {
  const entry = chart.artist_ranks.find(
    (e) => e.title.toLowerCase() === TITLE_SONG.toLowerCase(),
  );
  return entry ? entry.rank : null;
}

function formatRankChange(currentRank: number | null, previousRank: number | null): string | null {
  if (currentRank === null || previousRank === null) return null;
  const diff = previousRank - currentRank;
  if (diff > 0) return `🔺${diff}`;
  if (diff < 0) return `🔻${Math.abs(diff)}`;
  return '-';
}

function formatViewCount(count: number): string {
  return count.toLocaleString('en-US');
}

function parseDateTime(updatedAt: string): { dateStr: string; hour: number } {
  // updated_at format: "2026-02-24 20:28" or "2026-02-24 20:28:59"
  const [datePart, timePart] = updatedAt.split(' ');
  const [year, month, day] = datePart.split('-');
  const hour = parseInt(timePart.split(':')[0], 10);
  return {
    dateStr: `${year}.${month}.${day}`,
    hour,
  };
}

export function formatTweet(current: CrawlData, previous: CrawlData | null): string {
  const { dateStr, hour } = parseDateTime(current.updated_at);
  const hashtag = `#${TITLE_SONG.replace(/ /g, '_')}`;

  const lines: string[] = [];

  // Header
  lines.push(`${dateStr} ${hour}시`);
  lines.push(`김성규 ${hashtag} 음원 차트 순위`);
  lines.push('');

  // Chart lines
  for (const chart of current.charts) {
    const currentRank = findTitleSongRank(chart);

    let previousRank: number | null = null;
    if (previous) {
      const prevChart = previous.charts.find((c) => c.chart_name === chart.chart_name);
      if (prevChart) {
        previousRank = findTitleSongRank(prevChart);
      }
    }

    const rankStr = currentRank !== null ? `${currentRank}위` : '-';
    const changeStr = formatRankChange(currentRank, previousRank);

    if (changeStr !== null) {
      lines.push(`${chart.chart_name} ${rankStr} (${changeStr})`);
    } else {
      lines.push(`${chart.chart_name} ${rankStr}`);
    }
  }

  // YouTube MV view count
  const titleVideo = current.youtube.find((v) =>
    v.title.toLowerCase().includes(TITLE_SONG.toLowerCase()),
  );
  if (titleVideo) {
    lines.push('');

    let mvLine = `MV ${formatViewCount(titleVideo.viewCount)}회`;
    if (previous) {
      const prevVideo = previous.youtube.find((v) =>
        v.title.toLowerCase().includes(TITLE_SONG.toLowerCase()),
      );
      if (prevVideo) {
        const viewDiff = titleVideo.viewCount - prevVideo.viewCount;
        if (viewDiff > 0) {
          mvLine += ` (🔺${formatViewCount(viewDiff)})`;
        }
      }
    }

    lines.push(mvLine);
  }

  // Footer hashtags
  lines.push('');
  lines.push('#김성규 #KIMSUNGKYU #OFFTHEMAP');

  return lines.join('\n');
}
