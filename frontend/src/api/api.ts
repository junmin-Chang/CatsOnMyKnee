import axios, { AxiosError } from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8000',

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const createAxiosResponseInterceptor = () => {
  const interceptor = instance.interceptors.response.use(
    (response) => response,
    async (err: AxiosError) => {
      if (err.response?.status !== 401) {
        return Promise.reject(err);
      }
      instance.interceptors.response.eject(interceptor);
      return instance
        .get('/users/refresh')
        .then(() => {
          return instance(err.response?.config!);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  );
};

export const getUserInfo = async () => {
  const res = await instance.get('/users');
  return res.data;
};
