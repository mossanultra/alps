"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Article } from "@/app/api/articles/articles";
import { Box } from "@mui/material";
import HamstarLoader from "../../loading/hamster/hamster";


export default function ArticleDetailePage() {
  const [article, setArticle] = useState<Article>();
  const [isLoding, setIsLoading] = useState(true);

  const loadArticle = useCallback(async (articleId: string | undefined) => {
    const articleJson = await fetch(`/api/articles/${articleId}`);
    const article = await articleJson.json();
    setArticle(article);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    // const pathname = usePathname();
    // console.log(pathname); // pathname => /post/1234
    loadArticle(articleId);
  }, [loadArticle]);

  const path = usePathname();
  if (!path) {
    return null;
  }
  const split = path.split("/");
  const articleId = split[split.length - 1];
  console.log(articleId); // pathname => /post/1234

//   const goBack = () => {
//     router.back();
//   };

  if (isLoding) {
    return <HamstarLoader></HamstarLoader>;
  }

  return(<Box>{JSON.stringify(article)}</Box>)
}
