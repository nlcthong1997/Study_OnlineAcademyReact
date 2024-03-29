import { axiosInstance, getToken } from '../utils/makeAPI';

export const getVideos = async (courseId) => {
  try {
    let res = await axiosInstance.get(`/courses/${courseId}/videos`, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    error.response.state = false;
    return error.response;
  }
}

export const getVideoIntro = async (courseId) => {
  try {
    let res = await axiosInstance.get(`/courses/${courseId}/video-intro`);
    if (res.status === 204) {
      return null;
    }
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
}

export const create = async (data) => {
  try {
    return await axiosInstance.post(`/videos`, data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const update = async (data, id) => {
  try {
    return await axiosInstance.put(`/videos/${id}`, data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const updateView = async (id) => {
  try {
    let res = await axiosInstance.put(`/videos/${id}/view`, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    error.response.state = false;
    return error.response;
  }
}