import { axiosInstance } from '../utils/makeAPI';

export const getAllCourses = async (page = 1) => {
  try {
    let limit = 2;
    const result = await axiosInstance.get(`/courses?limit=${limit}&page=${page}`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getSubscribedCourses = async () => {
  try {
    const subscribed = await axiosInstance.get('/courses/most-subscribed');
    return subscribed.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getHighlightsCourses = async () => {
  try {
    const highlights = await axiosInstance.get('/courses/highlights-last-week');
    return highlights.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getMostViewCourses = async () => {
  try {
    const mostView = await axiosInstance.get('/courses/most-view');
    return mostView.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getLatestCourses = async () => {
  try {
    const latest = await axiosInstance.get('/courses/latest');
    return latest.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getCourseByCategoryId = async (catId, page = 1) => {
  try {
    let limit = 2;
    let { data } = await axiosInstance.get(`/categories/${catId}/courses?limit=${limit}&page=${page}`);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getCourseById = async (id) => {
  try {
    let { data } = await axiosInstance.get(`/courses/${id}`);
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}