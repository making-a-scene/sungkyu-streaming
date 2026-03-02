import axios from 'axios';

const MV_IDS = [
  'AdOaQpwYx0c', 'bK_1FZYO0pg',
];

export interface YouTubeVideo {
  id: string;
  title: string;
  viewCount: number;
}

export async function crawlYouTube(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  const res = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet,statistics',
      id: MV_IDS.join(','),
      key: apiKey,
    },
  });

  return res.data.items.map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    viewCount: Number(item.statistics.viewCount ?? 0),
  }));
}
