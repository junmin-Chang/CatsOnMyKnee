import axiosInstance from '../index';
export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('/users');
  return data.user;
};
export const logout = async () => {
  return await axiosInstance.get('/auth/logout');
};

export const updateUserInfo = async (body: any) => {
  return await axiosInstance.patch('/users', body);
};
export const uploadUserImage = async (formData: any) => {
  return await axiosInstance.post('/users/image', formData);
};
