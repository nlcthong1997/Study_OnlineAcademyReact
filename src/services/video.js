import { axiosInstance, getToken } from '../utils/makeAPI';

export const getVideos = async (courseId) => {
  try {
    let res = await axiosInstance.get(`/courses/${courseId}/videos`, { headers: getToken() });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return [];
  }
}

export const getVideoIntro = async (courseId) => {
  try {
    let res = await axiosInstance.get(`/courses/${courseId}/video-intro`);
    if (res.status === 204) {
      console.log('return null');
      return null;
    }
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
}