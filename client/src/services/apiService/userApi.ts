import axios from 'axios';

interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

const apiUrl = import.meta.env.VITE_DEV_BACKEND_URL;

export const getUserInfo = async (id: number) => {
  const res = await axios.get(`${apiUrl}/users/${id}/profile`);
  return await res.data;
};

const handleError = (err: any) => {
  if (err && 'response' in err && typeof err.response === 'object') {
    throw new Error(err.response.data.message);
  }
};

export const loginUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${apiUrl}/users/login`, user);
    return res.data;
  } catch (err: any) {
    handleError(err);
  }
};

export const registerUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${apiUrl}/users/register`, user);
    return res.data;
  } catch (err: any) {
    handleError(err);
  }
};
