import axios, { AxiosResponse } from "axios";
import type IDataCategory from "../interfaces/models/IDataCategory";
import type IPatch from "../interfaces/models/IPatch";

const getDataCategories = async (): Promise<AxiosResponse<Array<IDataCategory>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/datacategories",
  });
};

const getNonEmptyDataCategories = async (): Promise<AxiosResponse<Array<IDataCategory>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/datacategories/non-empty"
  });
};

const getDataCategoryById = async (id: number): Promise<AxiosResponse<IDataCategory>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/datacategories/${id}`
  });
};

const createDataCategory = async (name: string): Promise<AxiosResponse<IDataCategory>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/datacategories",
    data: { name },
    withCredentials: true
  });
};

const patchDataCategory = async (
  id: number,
  patches: Array<IPatch>
): Promise<AxiosResponse<IDataCategory>> => {
  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/datacategories/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteDataCategory = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/datacategories/${id}`,
    withCredentials: true
  });
};

export {
  getDataCategories,
  getNonEmptyDataCategories,
  getDataCategoryById,
  createDataCategory,
  patchDataCategory,
  deleteDataCategory
};
