import axiosInstance from '../index';
export const getUserInfo = async () => {
  const res = await axiosInstance.get('/users');
  return res.data;
};
export const logout = async () => {
  return await axiosInstance.get('/auth/logout');
};
