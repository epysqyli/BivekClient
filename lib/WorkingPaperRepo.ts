import axios, { AxiosResponse } from "axios";
import type IPatch from "../interfaces/models/IPatch";
import type IWorkingPaper from "../interfaces/models/IWorkingPaper";
import IWorkingPaperCreate from "../interfaces/models/IWorkingPaperCreate";

const getWorkingPapers = async (): Promise<AxiosResponse<Array<IWorkingPaper>>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/workingpapers`
  });
};

const getWorkingPaper = async (id: number): Promise<AxiosResponse<IWorkingPaper>> => {
  return await axios({
    method: "GET",
    url: `${process.env.BASE_URL}/workingpapers/${id}`
  });
};

const createWorkingPaper = async (
  workingPaper: IWorkingPaperCreate
): Promise<AxiosResponse<IWorkingPaper>> => {
  const { title, abstract, link, datasetLink } = workingPaper;
  return await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/workingpapers`,
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
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/workingpapers/${id}`,
    data: patches,
    withCredentials: true
  });
};

const deleteWorkingPaper = async (id: number): Promise<AxiosResponse> => {
  return await axios({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/workingpapers/${id}`,
    withCredentials: true
  });
};

export { getWorkingPapers, getWorkingPaper, createWorkingPaper, patchWorkingPaper, deleteWorkingPaper };
