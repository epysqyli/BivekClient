import axios, { AxiosResponse } from "axios";
import type { Article, ArticlePatch } from "../interfaces/IArticle";
import type { GetServerSidePropsContext } from "next";

const getArticles = async (context: GetServerSidePropsContext): Promise<AxiosResponse<Array<Article>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/articles",
    headers: context.req.headers.cookie ? { cookie: context.req.headers.cookie } : undefined
  });
};

const getPublishedArticles = async (): Promise<AxiosResponse<Array<Article>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/articles/published"
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
    data: { title: title, body: body, published: isPublished },
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

const publishArticle = async (id: number): Promise<AxiosResponse<Article>> => {
  const patchData = [{ path: "published", op: "replace", value: "true" }];

  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const hideArticle = async (id: number): Promise<AxiosResponse<Article>> => {
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
  getArticles,
  getPublishedArticles,
  getArticleById,
  createArticle,
  patchArticle,
  deleteArticle,
  publishArticle,
  hideArticle
};
