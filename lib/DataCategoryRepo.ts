import axios, { AxiosResponse } from "axios";
import type IDataCategory from "../interfaces/models/IDataCategory";
import type IPatch from "../interfaces/models/IPatch";

const getDataCategories = async (): Promise<AxiosResponse<Array<IDataCategory>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/datacategories`,
  });
};

const getNonEmptyDataCategories = async (): Promise<AxiosResponse<Array<IDataCategory>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/datacategories/non-empty`
  });
};

const getDataCategoryById = async (id: number): Promise<AxiosResponse<IDataCategory>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/datacategories/${id}`
  });
};

const createDataCategory = async (name: string): Promise<AxiosResponse<IDataCategory>> => {
  return await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/datacategories`,
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/datacategories/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteDataCategory = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/datacategories/${id}`,
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
