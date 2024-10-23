import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser: Parser = new Parser();

const feeds: string[] = [
  'https://postd.cc/feed',  // 任意のRSS URL
  'https://spice-api.eplus.jp/rss/articles/4/latest.xml?encoded=1',
  'https://spice-api.eplus.jp/rss/articles/1/latest.xml?encoded=1'
];

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  encordedContent: string;
}

export async function GET() {
  try {
    let allFeedItems: FeedItem[] = [];

    for (const feed of feeds) {
      const feedData = await parser.parseURL(feed);
      const items = feedData.items.map((item) => ({
        title: item.title || 'No title',
        link: item.link || '#',
        pubDate: item.pubDate || '',
        content: item.content || '',
        contentSnippet: item.contentSnippet || '',
        encordedContent: item['content:encoded'] || ''
      }));
      allFeedItems = allFeedItems.concat(items);
    }

    // pubDateを使って新しい順にソート
    allFeedItems.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });

    return NextResponse.json(allFeedItems);
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
