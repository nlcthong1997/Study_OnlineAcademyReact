import { axiosInstance } from '../utils/makeAPI';

export const getDataPaginate = async (url) => {
  try {
    const rs = await axiosInstance.get(url);
    return rs.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}