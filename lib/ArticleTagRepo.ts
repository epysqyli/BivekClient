import axios, { AxiosResponse } from "axios";
import type { Article, ArticleTag } from "../interfaces/IArticle";

const getArticlesByTagId = async (id: number): Promise<AxiosResponse<Article>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/articletags/${id}`
  });
};

const createArticleTagRelation = async (articleTag: ArticleTag): Promise<AxiosResponse<ArticleTag>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/articletags",
    data: { articleId: articleTag.articleId, tagId: articleTag.tagId },
    withCredentials: true
  });
};

const deleteArticleTag = async (articleTag: ArticleTag): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/articletags/${articleTag.articleId}-${articleTag.tagId}`,
    withCredentials: true
  });
};

export { getArticlesByTagId, createArticleTagRelation, deleteArticleTag };
