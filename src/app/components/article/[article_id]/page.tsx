"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Article } from "@/app/api/articles/articles";
import HamstarLoader from "../../loading/hamster/hamster";

export default function ArticleDetailePage() {
  const [article, setArticle] = useState<Article>();
  const [isLoading, setIsLoading] = useState(true);

  // useParamsでURLパラメータを取得
  const { article_id } = useParams();

  const loadArticle = useCallback(async (articleId: string) => {
    if (!articleId) return;
    const articleJson = await fetch(`/api/articles/${articleId}`);
    const article = await articleJson.json();
    setArticle(article);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadArticle(article_id as string); // useParamsで取得したarticleIdを使用
  }, [loadArticle, article_id]);

  if (isLoading) {
    return <HamstarLoader />;
  }

  return <div>{JSON.stringify(article)}</div>;
}
