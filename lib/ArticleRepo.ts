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

const createArticle = async (title: string, body: string): Promise<AxiosResponse<ArticleResp>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/articles",
    data: { title: title, body: body },
    withCredentials: true
  });
};

const patchArticle = async (
  id: number,
  path: string,
  op: string,
  value: string
): Promise<AxiosResponse<ArticleResp>> => {
  const patchData = [{ path: path, op: op, value: value }];

  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const deleteArticle = async (id: number) => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/${id}`,
    withCredentials: true
  });
};

export { getArticleById, getArticles, createArticle, patchArticle, deleteArticle };
