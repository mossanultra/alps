import React from "react";
import { useRouter } from "next/navigation";
import { Article } from "../../api/articles/articles";

interface ExpandMoreProps {
    article: Article;
  }
  
export default function CustomCard(props: ExpandMoreProps) {
  const router = useRouter();

  if (!props.article) {
    return null; // Handle loading state or no article case
  }

  const handleClick = () => {
    router.push(`/components/article/${props.article.id}`);
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.textSection}>
        <h2 style={styles.title}>{props.article.title}</h2>
        <p style={styles.date}>{new Date(props.article.createdAt).toLocaleString()}</p>
        <p style={styles.content} onClick={handleClick}>
          {props.article.content}
        </p>
      </div>
      <div style={styles.imageSection}>
        <img
          src={"/china.jpg"}
          alt="News Image"
          style={styles.image}
        />
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  textSection: {
    flex: 2,
    padding: "16px",
  },
  title: {
    fontSize: "1.25rem",
    margin: "0 0 8px 0",
    color: "#000",
  },
  date: {
    fontSize: "0.875rem",
    color: "#888",
    marginBottom: "12px",
  },
  content: {
    fontSize: "1rem",
    color: "#555",
    cursor: "pointer",
  },
  imageSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "4px",
  },
};
