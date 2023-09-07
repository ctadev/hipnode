import axios, { AxiosError, AxiosResponse } from 'axios';
import { IPodcast } from '../../../types/index';

const API_URL: string = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): never => {
  throw new Error(err.response?.data.message);
};

export const getAllPodcasts = async (): Promise<IPodcast[]> => {
  try {
    const res = await axios.get<IPodcast[]>(`${API_URL}/podcasts`);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
    return [];
  }
};
