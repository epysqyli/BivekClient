import axios, { AxiosResponse } from "axios";
import type IArticle from "../interfaces/models/IArticle";
import type IPatch from "../interfaces/models/IPatch";
import type { GetServerSidePropsContext } from "next";

const getArticles = async (context: GetServerSidePropsContext): Promise<AxiosResponse<Array<IArticle>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articles`,
    headers: context.req.headers.cookie ? { cookie: context.req.headers.cookie } : undefined
  });
};

const getPublishedArticles = async (): Promise<AxiosResponse<Array<IArticle>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articles/published`
  });
};

const getLatestArticle = async (): Promise<AxiosResponse<IArticle>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articles/latest`
  });
};

const getArticleById = async (id: number): Promise<AxiosResponse<IArticle>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articles/${id}`
  });
};

const getArticleByTagIds = async (tagIds: Array<number>): Promise<AxiosResponse<Array<IArticle>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articles/tags`,
    data: tagIds
  });
};

const createArticle = async (
  title: string,
  body: string,
  isPublished: boolean
): Promise<AxiosResponse<IArticle>> => {
  return await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
    data: { title: title, body: body, published: isPublished },
    withCredentials: true
  });
};

const patchArticle = async (id: number, patches: Array<IPatch>): Promise<AxiosResponse<IArticle>> => {
  return await axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`,
    data: patches,
    withCredentials: true
  });
};

const publishArticle = async (id: number): Promise<AxiosResponse<IArticle>> => {
  const patchData = [{ path: "published", op: "replace", value: "true" }];

  return await axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const hideArticle = async (id: number): Promise<AxiosResponse<IArticle>> => {
  const patchData = [{ path: "published", op: "replace", value: "false" }];

  return await axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const deleteArticle = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`,
    withCredentials: true
  });
};

export {
  getArticles,
  getPublishedArticles,
  getLatestArticle,
  getArticleById,
  getArticleByTagIds,
  createArticle,
  patchArticle,
  deleteArticle,
  publishArticle,
  hideArticle
};
