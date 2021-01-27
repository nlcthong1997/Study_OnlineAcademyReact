import { axiosInstance } from '../utils/makeAPI';

export const search = async (q, page = 1) => {
  try {
    let limit = 2;
    const param = `?q=${q}&limit=${limit}&page=${page}`;
    const rs = await axiosInstance.get(`/courses/search${param}`);
    return rs.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}