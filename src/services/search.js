import { axiosInstance } from '../utils/makeAPI';

export const search = async (q, page = 1) => {
  try {
    const limit = 2;
    const param = `?q=${q}&limit=${limit}&page=${page}`;
    const res = await axiosInstance.get(`/courses/search${param}`);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}