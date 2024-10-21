// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Article, Articles } from "./articles";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Article>
) {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

//   const article = Articles.find((a) => a.id == "");
  const article = Articles[0];

  if (!article) {
    res.status(404);
  } else {
    res.status(200).json(article);
  }
}
