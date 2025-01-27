import axios from 'axios';
import { getAccessToken, removeAccessToken } from './token.request';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response.config.responseType === 'blob' ? response : response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
      window.location.href = `/auth/sign-in?returnUrl=${window.location.pathname}`;
    }
    return Promise.reject(error);
  },
);

export default api;
