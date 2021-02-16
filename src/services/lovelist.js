import { axiosInstance, getToken } from '../utils/makeAPI';

export const getLoveList = async () => {
  try {
    let res = await axiosInstance.get(`/love-list`, { headers: getToken() });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.auth;
  }
}

export const create = async (courseId) => {
  try {
    let res = await axiosInstance.post(`/love-list`, { courses_id: courseId }, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response);
    error.response.state = false; // 400
    return error.response;
  }
}

export const remove = async (courseId) => {
  try {
    //with delete method, add "data" for req
    let res = await axiosInstance.delete(`/love-list`, { data: { courses_id: courseId } }, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response);
    error.response.state = false; // 400
    return error.response;
  }
}