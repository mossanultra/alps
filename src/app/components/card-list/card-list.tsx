import { useEffect, useState } from "react";
import HamstarLoader from "../loading/hamster/hamster";
import CustomCard from "../card-plane/card-plane"; // Make sure this is your non-MUI CustomCard
import styles from "./card-list.module.css"; // Import the CSS module

export default function CardList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getArticles() {
    const response = await fetch("/api/articles/list");
    const articles = await response.json();
    setArticles(articles);
  }

  useEffect(() => {
    const fetchArticles = async () => {
      await getArticles();
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  if (isLoading) {
    return <HamstarLoader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {articles.map((article, index) => (
          <div key={index} className={styles.listItem}>
            <CustomCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
