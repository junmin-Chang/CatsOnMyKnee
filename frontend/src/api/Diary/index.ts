import axiosInstance from '../index';

export const createDiary = async (name: string, data: any) => {
  const res = await axiosInstance.post(`/diary/${name}`, data);
  return res.data;
};

export const getDiaries = async (name: string) => {
  const res = await axiosInstance.get(`/diary/${encodeURIComponent(name)}`);
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
