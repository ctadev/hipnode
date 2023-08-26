import axios from 'axios';

const apiUrl = import.meta.env.VITE_DEV_BACKEND_URL;

export const fetchPosts = async () => {
  const res = await axios(`${apiUrl}/posts`);
  return await res.data;
};
