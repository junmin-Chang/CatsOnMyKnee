import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err: AxiosError) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }
    axiosInstance.interceptors.response.eject(0);
    return axiosInstance
      .get('/users/refresh')
      .then(() => {
        return axiosInstance(err.response?.config!);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
);

export default axiosInstance;
