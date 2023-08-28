import axios from 'axios';

interface ILoginUser {
  email: string;
  password: string;
}

const apiUrl = import.meta.env.VITE_DEV_BACKEND_URL;

export const getUserInfo = async (id: number) => {
  const res = await axios.get(`${apiUrl}/users/${id}/profile`);
  return await res.data;
};

export const loginUser = async (user: ILoginUser) => {
  try {
    const res = await axios.post(`${apiUrl}/users/login`, user);
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
  }
};
