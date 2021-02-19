import { axiosInstance, getToken } from '../utils/makeAPI';

export const getLoveList = async () => {
  try {
    return await axiosInstance.get(`/love-list`, { headers: getToken() });
  } catch (error) {
    return error.response
  }
}

export const create = async (courseId) => {
  try {
    return await axiosInstance.post(`/love-list`, { courses_id: courseId }, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const remove = async (courseId) => {
  try {
    //with delete method, add "data" for req
    return await axiosInstance.delete(`/love-list`, { data: { courses_id: courseId } }, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}