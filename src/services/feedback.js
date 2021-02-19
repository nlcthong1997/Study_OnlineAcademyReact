import { axiosInstance, getToken } from '../utils/makeAPI';

export const create = async (data) => {
  try {
    return await axiosInstance.post('/feedbacks', data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}