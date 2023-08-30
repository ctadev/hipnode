import axios from 'axios';

interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

const handleError = (err: any) => {
  if (err && 'response' in err && typeof err.response === 'object') {
    throw new Error(err.response.data.message);
  }
};

export const getUserInfo = async (id: number) => {
  try {
    const res = await axios.get(`${API_URL}/users/${id}/profile`);
    return await res.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const loginUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, user);
    return res.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const registerUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, user);
    return res.data;
  } catch (err: any) {
    handleError(err);
  }
};
