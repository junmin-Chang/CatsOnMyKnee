import axiosInstance from './index';

export const getUserInfo = async () => {
  const res = await axiosInstance.get('/users');
  return res.data;
};

export const getCatInfo = async (name: string) => {
  const res = await axiosInstance.get(`/cat/${name}`);
  return res.data;
};

export const logout = async () => {
  return await axiosInstance.get('/auth/logout');
};

export const enrollCat = async (data: any) => {
  await axiosInstance.post('/cat/enroll', data).then(() => {
    alert('등록 완료!');
  });
};
