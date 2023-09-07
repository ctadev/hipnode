import axios, { AxiosError } from 'axios';
import { IUser } from '../../../types/index';

interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): never => {
  throw new Error(err.response?.data.message);
};

export const getUserInfo = async (id: number): Promise<IUser> => {
  try {
    const res = await axios.get<IUser>(`${API_URL}/users/${id}/profile`);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
  }
};

export const loginUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, user);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
  }
};

export const registerUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, user);
    return res.data;
  } catch (err) {
    handleError(err as AxiosError<IApiError>);
  }
};
