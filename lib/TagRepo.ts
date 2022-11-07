import axios, { AxiosResponse } from "axios";
import type ITag from "../interfaces/models/ITag";
import type IPatch from "../interfaces/models/IPatch";

const getTags = async (): Promise<AxiosResponse<Array<ITag>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/tags`
  });
};

const getTagById = async (id: number): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/tags/${id}`
  });
};

const createTag = async (name: string): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/tags`,
    data: { name },
    withCredentials: true
  });
};

const patchTag = async (id: number, patches: Array<IPatch>): Promise<AxiosResponse<ITag>> => {
  return await axios({
    method: "PATCH",
    url: `${process.env.BASE_URL}/tags/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteTag = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/tags/${id}`,
    withCredentials: true
  });
};

export { getTags, getTagById, createTag, patchTag, deleteTag };
