import React, { useState, useEffect } from "react";
import FeedCard from "../card-feed/card-feed";
import HamstarLoader from "../loading/hamster/hamster";
import styles from "./feed.module.css"; // Import the CSS module

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  encordedContent: string;
}

const RssFeedList: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSSFeeds = async () => {
      try {
        const response = await fetch("/api/feed");
        const data: FeedItem[] = await response.json();
        setFeedItems(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Failed to fetch RSS feeds");
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeeds();
  }, []);

  if (loading) {
    return <HamstarLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* <div>
        <h1>RSS Feed List</h1>
      </div> */}
      <div className={styles.list}>
        {feedItems.map((item, index) => (
          <FeedCard
            key={index}
            title={item.title}
            snipet={item.contentSnippet}
            encordedString={item.encordedContent}
            pubData={item.pubDate}
            link={item.link}
          ></FeedCard>
        ))}
      </div>
    </div>

    // <div>
    //   <h1>RSS Feed List</h1>
    //   <ul>
    //     {feedItems.map((item, index) => (
    //       <li key={index}>
    //         <FeedCard title={item.title} snipet={item.contentSnippet} encordedString={item.encordedContent} pubData={item.pubDate}></FeedCard>
    //         {/* <a href={item.link} target="_blank" rel="noopener noreferrer">
    //           {item.title}
    //         </a> */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default RssFeedList;
