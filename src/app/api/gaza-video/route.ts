import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY; // put your key in .env file
const CHANNEL_ID = 'UCNye-wNBqNL5ZzHSJj3l8Bg';

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: 'Missing YouTube API key' }, { status: 500 });
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
    new URLSearchParams({
      key: API_KEY,
      channelId: CHANNEL_ID,
      part: 'snippet',
      order: 'date',
      maxResults: '5',
      q: 'Gaza',
      type: 'video',
    }).toString();

  try {
    const res = await fetch(searchUrl);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ message: 'No Gaza videos found' });
    }

    // Return first video info
    const video = data.items[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const publishedAt = video.snippet.publishedAt;
    const thumbnail = video.snippet.thumbnails.high.url;

    return NextResponse.json({
      videoId,
      title,
      description,
      publishedAt,
      thumbnail,
    });
  } catch (error) {
   return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
