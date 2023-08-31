import axios, { AxiosError, AxiosResponse } from 'axios';
import { IPodcast } from '../../../types/index';

const API_URL: string = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface ErrorResponse {
  message: string;
}

const handleError = (err: AxiosError<ErrorResponse>): void => {
  if (err && err.response) {
    throw new Error(err.response.data.message);
  }
  throw new Error('An error occured');
};

export const getAllPodcasts = async (): Promise<IPodcast[] | undefined> => {
  try {
    const res: AxiosResponse<IPodcast[]> = await axios.get(
      `${API_URL}/podcasts`,
    );
    return res.data as IPodcast[];
  } catch (err) {
    handleError(err as AxiosError<ErrorResponse>);
  }
};
