import axios from 'axios';

interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

const handleError = (err: any) => {
  if (err && err.response) {
    const messageData = err.response?.message?.data;
    throw new Error(messageData ? messageData : err.message);
  }
  throw new Error('An error occured');
};

export const getUserInfo = async (id: number) => {
  const res = await axios.get(`${API_URL}/users/${id}/profile`);
  return await res.data;
};

export const loginUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, user);
    console.log('response', res);
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
