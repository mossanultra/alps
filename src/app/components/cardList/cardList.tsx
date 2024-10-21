import { List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import CardSmanu from "../card/card_smanu";
import { Article } from "../../api/articles/articles";
import HamstarLoader from "../loading/hamster/hamster";

export default function CardList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getArticles() {
    const response = await fetch("/api/articles/list");
    const articles = await response.json();
    console.log(articles)
    setArticles(articles);
  }

  useEffect(() => {
    const fetchArticles = async () => {
      await getArticles();
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  if(isLoading){
    return(<HamstarLoader></HamstarLoader>)
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "72px" }}
    >
      <List sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}>
        {!isLoading &&
          articles.map((article) => {
            return (
              <>
                <ListItem alignItems="flex-start">
                  <CardSmanu
                    expand={false}
                    article={article}
                  ></CardSmanu>
                </ListItem>
              </>
            );
          })}
      </List>
    </div>
  );
}
