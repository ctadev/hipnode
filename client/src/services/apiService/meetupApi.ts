import axios, { AxiosResponse } from 'axios';
import { IMeetup } from '../../../types/index';

const API_URL: string = import.meta.env.VITE_DEV_BACKEND_URL as string;

export const getAllMeetups = async (): Promise<IMeetup[] | undefined> => {
  const res: AxiosResponse<IMeetup[]> = await axios.get(`${API_URL}/meetups`);
  return res.data as IMeetup[];
};
