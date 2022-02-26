import axios, { AxiosError } from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,

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
      .get('/auth/refresh')
      .then(() => {
        return axiosInstance(err.response?.config!);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
);

export default axiosInstance;
