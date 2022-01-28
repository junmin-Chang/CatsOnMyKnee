import axiosInstance from '../index';
export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('/users');
  return data.user;
};
export const logout = async () => {
  return await axiosInstance.get('/auth/logout');
};
