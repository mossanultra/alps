import { useEffect, useState } from "react";
import HamstarLoader from "../loading/hamster/hamster";
import CustomCard from "../card/card-plane"; // Make sure this is your non-MUI CustomCard

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
    <div style={styles.container}>
      <div style={styles.list}>
        {articles.map((article) => (
          <div key={"id"} style={styles.listItem}>
            <CustomCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "72px",
  },
  list: {
    width: "100%",
    maxWidth: "720px",
    backgroundColor: "#fff", // Adjust background as needed
  },
  listItem: {
    padding: "16px",
    borderBottom: "1px solid #ddd",
  },
};
