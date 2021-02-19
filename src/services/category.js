import { axiosInstance } from '../utils/makeAPI';

export const getInitCategories = async () => {
  try {
    return await axiosInstance.get('/categories');
  } catch (error) {
    error.response.data = [];
    return error.response;
  }
}