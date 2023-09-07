import axios, { AxiosError } from 'axios';
import { IGroup } from '../../../types/index';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): never => {
  throw new Error(err.response?.data.message || 'An error occurred');
};

export const getAllGroups = async (): Promise<IGroup[]> => {
  try {
    const res = await axios.get<IGroup[]>(`${API_URL}/groups`);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
    return [];
  }
};
