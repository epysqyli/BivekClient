import axios, { AxiosResponse } from "axios";
import type { Tag } from "../interfaces/IArticle";

const getTags = async (): Promise<AxiosResponse<Array<Tag>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/tags"
  });
};

const getTagById = async (id: number): Promise<AxiosResponse<Tag>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/tags/${id}`
  });
};

const createTag = async (name: string): Promise<AxiosResponse<Tag>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/tags",
    data: { name },
    withCredentials: true
  });
};

const patchTag = async (id: number, path: string, op: string, value: string): Promise<AxiosResponse<Tag>> => {
  const patchData = [{ path: path, op: op, value: value }];

  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/tags/${id}`,
    data: patchData,
    withCredentials: true
  });
};

const deleteTag = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/tags/${id}`,
    withCredentials: true
  });
};

export { getTags, getTagById, createTag, patchTag, deleteTag };
