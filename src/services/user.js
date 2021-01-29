import { axiosInstance, getToken } from '../utils/makeAPI';

export const getUser = async () => {
  try {
    let res = await axiosInstance.get('/users/info', { headers: getToken() });
    if (res === null) {
      return res;
    }
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
} 