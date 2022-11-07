import axios, { AxiosResponse } from "axios";
import type IDataset from "../interfaces/models/IDataset";
import type IDatasetCreate from "../interfaces/models/IDatasetCreate";
import type IPatch from "../interfaces/models/IPatch";

const getDatasets = async (): Promise<AxiosResponse<Array<IDataset>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/datasets`
  });
};

const getDatasetById = async (id: number): Promise<AxiosResponse<IDataset>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/datasets/${id}`
  });
};

const createDataset = async (dataset: IDatasetCreate): Promise<AxiosResponse<IDataset>> => {
  const {title, link, dataCategoryId} = dataset;  
  return await axios({
    method: "POST",
    url: `${process.env.BASE_URL}/datasets`,
    data: { title, link, dataCategoryId },
    withCredentials: true
  });
};

const patchDataset = async (id: number, patches: Array<IPatch>): Promise<AxiosResponse<IDataset>> => {
  return await axios({
    method: "PATCH",
    url: `${process.env.BASE_URL}/datasets/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteDataset = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.BASE_URL}/datasets/${id}`,
    withCredentials: true
  });
};

export { getDatasets, getDatasetById, createDataset, patchDataset, deleteDataset };
