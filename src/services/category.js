import { axiosInstance } from '../utils/makeAPI';

export const getInitCategories = async () => {
  try {
    let categories = await axiosInstance.get('/categories');
    return categories.data;
  } catch (error) {
    console.log(error.response.data);
    return [];
  }
}