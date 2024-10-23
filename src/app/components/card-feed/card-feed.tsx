import React from "react";
// import { useRouter } from "next/navigation";
import styles from "./card-feed.module.css";

interface ExpandMoreProps {
  title: string;
  snipet: string;
  encordedString: string;
  pubData:string;
}

export default function FeedCard(props: ExpandMoreProps) {
//   const router = useRouter();

  const handleClick = () => {
    // router.push(`/components/article/${props.article.id}`);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.date}>
          {props.pubData}
        </p>
        <p className={styles.content} onClick={handleClick}>
          {props.snipet}
        </p>
      </div>
      {/* <div className={styles.imageSection}>
        <img src={"/china.jpg"} alt="News Image" className={styles.image} />
      </div> */}
    </div>
  );
}
