// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Article } from "../../api/articles/articles";
// import { ThemeProvider } from "@mui/material/styles";
// import styles from "../../../styles/Home.module.css";

// interface PageProps {
//   params: {
//     article_id: string;
//   };
// }

// export default function ArticleDetailePage() {
//   const [article, setArticle] = useState<Article>();
//   const [isLoding, setIsLoading] = useState(true);
//   const router = useRouter();

//   const loadArticle = useCallback(async (articleId: string | undefined) => {
//     const articleJson = await fetch(`/api/articles/${articleId}`);
//     const article = await articleJson.json();
//     setArticle(article);
//     setIsLoading(false);
//   }, []);
//   useEffect(() => {
//     // const pathname = usePathname();
//     // console.log(pathname); // pathname => /post/1234
//     loadArticle(articleId);
//   }, [loadArticle]);

//   const path = usePathname();
//   if (!path) {
//     return null;
//   }
//   const split = path.split("/");
//   const articleId = split[split.length - 1];
//   console.log(articleId); // pathname => /post/1234

//   const goBack = () => {
//     router.back();
//   };

//   if (isLoding) {
//     return <div>now loading ...</div>;
//   }

//   return(<div className={styles.container}>{JSON.stringify(article)}</div>)
  
// }
