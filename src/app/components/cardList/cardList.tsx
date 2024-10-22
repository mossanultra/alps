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
    backgroundImage: "url('/chikawa1.jpg')", // ここに背景画像のパスを指定
    backgroundSize: "cover", // 画像がコンテナ全体を覆うようにする
    backgroundPosition: "center", // 画像を中央に配置する
    backgroundRepeat: "no-repeat", // 画像を繰り返さない
    minHeight: "100vh", // ページ全体を覆うように高さを設定
  },
  list: {
    width: "100%",
    maxWidth: "720px",
    backgroundColor: "rgba(255, 255, 255, 1.0)", // 背景を透過させる
    padding: "16px",
    borderRadius: "8px", // カードの周りを少し角丸にする
  },
  listItem: {
    padding: "16px",
  },
};
