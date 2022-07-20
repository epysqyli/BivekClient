import axios, { AxiosResponse } from "axios";
import type IPatch from "../interfaces/models/IPatch";
import type IWorkingPaper from "../interfaces/models/IWorkingPaper";
import IWorkingPaperCreate from "../interfaces/models/IWorkingPaperCreate";

const getWorkingPapers = async (): Promise<AxiosResponse<Array<IWorkingPaper>>> => {
  return await axios({
    method: "GET",
    url: "http://localhost:5010/workingpapers"
  });
};

const getWorkingPaper = async (id: number): Promise<AxiosResponse<IWorkingPaper>> => {
  return await axios({
    method: "GET",
    url: `http://localhost:5010/workingpapers/${id}`
  });
};

const createWorkingPaper = async (
  workingPaper: IWorkingPaperCreate
): Promise<AxiosResponse<IWorkingPaper>> => {
  const { title, abstract, link, datasetLink } = workingPaper;
  return await axios({
    method: "POST",
    url: "http://localhost:5010/workingpapers",
    data: { title, abstract, link, datasetLink },
    withCredentials: true
  });
};

const patchWorkingPaper = async (
  id: number,
  patches: Array<IPatch>
): Promise<AxiosResponse<IWorkingPaper>> => {
  return await axios({
    method: "PATCH",
    url: `http://localhost:5010/workingpapers/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteWorkingPaper = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `http://localhost:5010/workingpapers/${id}`,
    withCredentials: true
  });
};

export { getWorkingPapers, getWorkingPaper, createWorkingPaper, patchWorkingPaper, deleteWorkingPaper };
