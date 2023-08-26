import axios from 'axios';

const apiUrl = import.meta.env.VITE_DEV_BACKEND_URL;

export const getUserInfo = async (id) => {
  const res = await axios.get(`${apiUrl}/users/${id}/profile`);
  return await res.data;
};
