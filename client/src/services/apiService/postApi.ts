import axios, { AxiosError } from 'axios';
import { IPost } from '../../../types/index';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): never => {
  throw new Error(err.response?.data.message);
};

export const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const res = await axios.get<IPost[]>(`${API_URL}/posts`);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
    return [];
  }
};
