import IArticle from "../interfaces/models/IArticle";
import { getPublishedArticles } from "./ArticleRepo";
import { getArticleByTagIds } from "./ArticleRepo";

const filterMaxArticles = (articles: Array<IArticle>, currentId: number, max: number) => {
  return articles.filter((a) => a.id !== currentId).slice(0, max);
};

const getFurtherReading = async (tagIds: Array<number>, articleId: number): Promise<Array<IArticle>> => {
  const similarArticlesResp = (await getArticleByTagIds(tagIds)).data;
  let similarArticles: Array<IArticle>;
  if (
    similarArticlesResp.length === 0 ||
    (similarArticlesResp.length === 1 && similarArticlesResp[0].id === articleId)
  ) {
    similarArticles = (await getPublishedArticles()).data;
  } else {
    similarArticles = similarArticlesResp;
  }

  return filterMaxArticles(similarArticles, articleId, 3);
};

export { getFurtherReading };
