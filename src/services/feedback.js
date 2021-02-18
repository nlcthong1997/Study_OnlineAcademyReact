import { axiosInstance, getToken } from '../utils/makeAPI';

export const create = async (data) => {
  try {
    let res = await axiosInstance.post('/feedbacks', data, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) { // 400, 403, 401
    console.log(error.response.data);
    error.response.state = false; // 400
    return error.response;
  }
}