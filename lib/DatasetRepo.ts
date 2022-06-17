import axios, { AxiosResponse } from "axios";
import type IDataset from "../interfaces/models/IDataset";
import type IDatasetCreate from "../interfaces/models/IDatasetCreate";
import type IPatch from "../interfaces/models/IPatch";

const getDatasets = async (): Promise<AxiosResponse<Array<IDataset>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/datasets"
  });
};

const getDatasetById = async (id: number): Promise<AxiosResponse<IDataset>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/datasets/${id}`
  });
};

const createDataset = async (dataset: IDatasetCreate): Promise<AxiosResponse<IDataset>> => {
  const {title, link, dataCategoryId} = dataset;  
  return await axios({
    method: "POST",
    url: "http://localhost:5010/datasets",
    data: { title, link, dataCategoryId },
    withCredentials: true
  });
};

const patchDataset = async (id: number, patches: Array<IPatch>): Promise<AxiosResponse<IDataset>> => {
  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/datasets/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteDataset = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/datasets/${id}`,
    withCredentials: true
  });
};

export { getDatasets, getDatasetById, createDataset, patchDataset, deleteDataset };
