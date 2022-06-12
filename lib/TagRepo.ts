import axios, { AxiosResponse } from "axios";
import type ITag from "../interfaces/models/ITag";
import type IPatch from "../interfaces/models/IPatch";

const getTags = async (): Promise<AxiosResponse<Array<ITag>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/tags"
  });
};

const getTagById = async (id: number): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/tags/${id}`
  });
};

const createTag = async (name: string): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/tags",
    data: { name },
    withCredentials: true
  });
};

const patchTag = async (id: number, patches: Array<IPatch>): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/tags/${id}`,
    data: patches,
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
