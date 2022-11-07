import axios, { AxiosResponse } from "axios";
import type IArticle from "../interfaces/models/IArticle";
import type IArticleTag from '../interfaces/models/IArticleTag';

const getArticlesByTagId = async (id: number): Promise<AxiosResponse<IArticle>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/articletags/${id}`
  });
};

const createArticleTagRelation = async (articleTag: IArticleTag): Promise<AxiosResponse<IArticleTag>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/articletags`,
    data: { articleId: articleTag.articleId, tagId: articleTag.tagId },
    withCredentials: true
  });
};

const deleteArticleTag = async (articleTag: IArticleTag): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/articletags/${articleTag.articleId}-${articleTag.tagId}`,
    withCredentials: true
  });
};

export { getArticlesByTagId, createArticleTagRelation, deleteArticleTag };
