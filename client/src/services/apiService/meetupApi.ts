import axios, { AxiosError, AxiosResponse } from 'axios';
import { IMeetup } from '../../../types/index';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): never => {
  throw new Error(err.response?.data.message || 'An error occurred');
};

export const getAllMeetups = async (): Promise<IMeetup[]> => {
  try {
    const res = await axios.get<IMeetup[]>(`${API_URL}/meetups`);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
    return [];
  }
};
