import axios, { AxiosResponse } from "axios";
import type { ArticleResp, Article } from "../interfaces/IArticle";

const getArticles = async (): Promise<AxiosResponse<Array<Article>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/articles"
  });
};

const getArticleById = async (id: number): Promise<AxiosResponse<ArticleResp>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/articles/${id}`
  });
};

export { getArticleById, getArticles };
