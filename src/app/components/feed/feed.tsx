import React, { useState, useEffect } from "react";
import FeedCard from "../card-feed/card-feed";
import HamstarLoader from "../loading/hamster/hamster";
import styles from "./feed.module.css"; // Import the CSS module
import ThreeDCard from "../threed-card/threed-card";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  encordedContent: string;
  feedUrl: string;
}

const RssFeedList: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getRandomColor = ():
    | "purple"
    | "green"
    | "blue"
    | "pink"
    | "yellow" => {
    const colors: ("purple" | "green" | "blue" | "pink" | "yellow")[] = [
      "purple",
      "green",
      "blue",
      "pink",
      "yellow",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const formatDate = (
    inputDate: string
  ): { month: string; day: string } | { error: string } => {
    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
      return { error: "Invalid Date" }; // 無効な日付の場合にエラーオブジェクトを返す
    }

    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month: string = monthNames[date.getUTCMonth()]; // 0から始まるため、配列から取得
    const day: string = date.getUTCDate().toString(); // 日付を文字列に変換

    return { month, day };
  };

  useEffect(() => {
    const fetchRSSFeeds = async () => {
      try {
        const response = await fetch("/api/feed");
        const data: FeedItem[] = await response.json();
        setFeedItems(data);
        console.log(data);
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
    <div>
      <div className={styles.container}>
        <div className={styles.list}>
          {feedItems.map((item, index) => {
            const date = formatDate(item.pubDate);
            let month = "None";
            let day = "1";
            if (!("error" in date)) {
              month = date.month;
              day = date.day;
            }

            return (
              <ThreeDCard
                key={index}
                colorTheme={getRandomColor()}
                title={item.title}
                createdAt={item.pubDate}
                url={item.link}
                content={item.contentSnippet}
                month={month}
                day={day}
              ></ThreeDCard>
            );
          })}
        </div>
      </div>
      <div className={styles.container}>
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
