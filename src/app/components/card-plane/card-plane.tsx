import React from "react";
import { useRouter } from "next/navigation";
import { Article } from "../../api/articles/articles";
import styles from "./card-plane.module.css";

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
    <div className={styles.cardContainer}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>{props.article.title}</h2>
        <p className={styles.date}>
          {new Date(props.article.createdAt).toLocaleString()}
        </p>
        <p className={styles.content} onClick={handleClick}>
          {props.article.content}
        </p>
      </div>
      <div className={styles.imageSection}>
        <img src={"/china.jpg"} alt="News Image" className={styles.image} />
      </div>
    </div>
  );
}
