import axiosInstance from './index';

export const getUserInfo = async () => {
  const res = await axiosInstance.get('/users');
  return res.data;
};

export const getCatInfo = async (name: string) => {
  const res = await axiosInstance.get(`/cat/${name}`);
  return res.data;
};

export const deleteCat = async (name: string) => {
  const res = await axiosInstance.delete(`/cat/${name}`);
  return res.data;
};

export const updateCat = async (name: string, body: any) => {
  const res = await axiosInstance.patch(`/cat/${name}`, body);
  return res.data;
};

export const createDiary = async (name: string, data: any) => {
  const res = await axiosInstance.post(`/diary/${name}`, data);
  return res.data;
};

export const getDiary = async (name: string, id: string) => {
  const res = await axiosInstance.get(`diary/${name}/${id}`);
  return res.data;
};

export const deleteDiary = async (name: string, id: string) => {
  const res = await axiosInstance.delete(`diary/${name}/${id}`);
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
