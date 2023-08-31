import axios from 'axios';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

export const fetchPosts = async () => {
  const res = await axios(`${API_URL}/posts`);
  return await res.data;
};
