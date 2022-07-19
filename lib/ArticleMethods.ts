import { AxiosResponse } from "axios";
import IArticle from "../interfaces/models/IArticle";
import { getPublishedArticles } from "./ArticleRepo";
import { getArticleByTagIds } from "./ArticleRepo";

const getFurtherReading = async (tagIds: Array<number>): Promise<AxiosResponse<Array<IArticle>>> => {
  const similarArticlesResp = await getArticleByTagIds(tagIds);
  return similarArticlesResp.data.length !== 0 ? similarArticlesResp : await getPublishedArticles();
};

const filterMaxArticles = (articles: Array<IArticle>, currentId: number, max: number) => {
  return articles.filter((a) => a.id !== currentId).slice(0, max);
};

export { getFurtherReading, filterMaxArticles };
