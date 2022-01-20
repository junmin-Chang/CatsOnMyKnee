import axiosInstance from '../index';
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

export const enrollCat = async (data: any) => {
  await axiosInstance.post('/cat/enroll', data).then(() => {
    alert('등록 완료!');
  });
};

export const deleteImage = async (name: string) => {
  await axiosInstance.delete(`/cat/${name}/image`).then(() => {
    alert('삭제 완료!');
  });
};
export const uploadImage = async (name: string, formData: any) => {
  await axiosInstance.post(`/cat/${name}/image`, formData).then(() => {
    alert('등록 완료!');
  });
};
