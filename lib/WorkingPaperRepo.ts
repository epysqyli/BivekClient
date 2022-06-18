import axios, { AxiosResponse } from "axios";
import type IPatch from "../interfaces/models/IPatch";
import type IWorkingPaper from "../interfaces/IWorkingPaper";

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

const createWorkingPaper = async (name: string): Promise<AxiosResponse<IWorkingPaper>> => {
  return await axios({
    method: "POST",
    url: "http://localhost:5010/workingpapers",
    data: { name },
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
