import { axiosInstance, getToken } from '../utils/makeAPI';

export const create = async (data) => {
  try {
    let res = await axiosInstance.post('/slides', data, { headers: getToken() })
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    error.response.state = false;
    return error.response
  }
}

export const getSlides = async (courseId) => {
  try {
    let res = await axiosInstance.get(`/courses/${courseId}/slides`, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    error.response.state = false;
    return error.response;
  }
}

export const update = async (data, id) => {
  try {
    let res = await axiosInstance.put(`/slides/${id}`, data, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    error.response.state = false;
    return error.response;
  }
}