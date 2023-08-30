import axios, { AxiosError, AxiosResponse } from 'axios';
import { IMeetup } from '../../../types/index';

const API_URL: string = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface ErrorResponse {
  message: string;
}

const handleError = (err: AxiosError<ErrorResponse>) => {
  if (err && err.response) {
    throw new Error(err.response.data.message);
  }
  throw new Error('An error occured');
};

export const getAllMeetups = async (): Promise<IMeetup[] | undefined> => {
  try {
    const res: AxiosResponse<IMeetup[]> = await axios.get(`${API_URL}/meetups`);
    return res.data as IMeetup[];
  } catch (err) {
    handleError(err as AxiosError<ErrorResponse>);
  }
};
