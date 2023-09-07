import axios, { AxiosError } from 'axios';
import { IUser } from '../../../types/index';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL as string;

interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

interface ILoginResponse {
  username: string;
  email: string;
  token: string;
  id: number;
}

interface IRegisterResponse {
  success: boolean;
  message: string;
}

interface IApiError {
  message: string;
}

const handleError = (err: AxiosError<IApiError>): Promise<never> => {
  return Promise.reject(
    new Error(err.response?.data.message || 'An error occurred'),
  );
};

export const getUserInfo = async (id: number): Promise<IUser> => {
  try {
    const res = await axios.get<IUser>(`${API_URL}/users/${id}/profile`);
    return res.data;
  } catch (err) {
    return handleError(err as AxiosError<IApiError>);
  }
};

export const loginUser = async (user: ILoginUser): Promise<ILoginResponse> => {
  try {
    const res = await axios.post<ILoginResponse>(
      `${API_URL}/users/login`,
      user,
    );
    return res.data;
  } catch (err) {
    return handleError(err as AxiosError<IApiError>);
  }
};

export const registerUser = async (
  user: ILoginUser,
): Promise<IRegisterResponse> => {
  try {
    const res = await axios.post<IRegisterResponse>(
      `${API_URL}/users/register`,
      user,
    );
    return res.data;
  } catch (err) {
    return handleError(err as AxiosError<IApiError>);
  }
};
