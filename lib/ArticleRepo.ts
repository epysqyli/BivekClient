import axios, { AxiosResponse } from "axios";
import type { Article, ArticlePatch } from "../interfaces/IArticle";

const getArticles = async (): Promise<AxiosResponse<Array<Article>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/articles"
  });
};

const getArticleById = async (id: number): Promise<AxiosResponse<Article>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/articles/${id}`
  });
};

const createArticle = async (
  title: string,
  body: string,
  isPublished: boolean
): Promise<AxiosResponse<Article>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/articles",
    data: { title, body, isPublished },
    withCredentials: true
  });
};

const patchArticle = async (id: number, patches: Array<ArticlePatch>): Promise<AxiosResponse<Article>> => {
  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/articles/${id}`,
    data: patches,
    withCredentials: true
  });
};

const publishArticle = async (
  id: number,
  path: string,
  op: string,
  value: string
): Promise<AxiosResponse<Article>> => {
  const patchData = [{ path: "published", op: "replace", value: "true" }];

  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const hideArticle = async (
  id: number,
  path: string,
  op: string,
  value: string
): Promise<AxiosResponse<Article>> => {
  const patchData = [{ path: "published", op: "replace", value: "false" }];

  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const deleteArticle = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/articles/${id}`,
    withCredentials: true
  });
};

export {
  getArticleById,
  getArticles,
  createArticle,
  patchArticle,
  deleteArticle,
  publishArticle,
  hideArticle
};
