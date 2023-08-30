import axios from 'axios';

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

const handleError = (err: any) => {
  if (err && typeof err === 'object' && 'response' in err) {
    throw new Error(err.response?.data?.message);
  }
};

export const getAllPodcasts = async () => {
  try {
    const res = await axios.get(`${API_URL}/podcasts`);
    return res.data;
  } catch (err: any) {
    handleError(err);
  }
};
