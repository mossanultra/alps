import React, { useEffect, useState } from "react";
import styles from "./content-grid.module.css";

type Post = {
  guid: string;
  text: string;
  imageUrl: string;
};

export default function ContentGrid() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/post", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <button onClick={fetchPosts} className={styles.refreshButton}>
        Refresh
      </button>
      <div className={styles.grid2}>
        {posts.map((post) => (
          <div className={styles.card2} key={post.guid}>
            {/* <div className={styles.cardImage2}> */}
              {/* Base64画像を<img>タグで表示 */}
              <img
                src={post.imageUrl}
                alt={post.text}
                className={styles.cardImage2}
              />
            {/* </div> */}
            <div className={styles.cardText}>{post.text}</div>
            <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
          </div>
        ))}
      </div>
    </>
  );
}
