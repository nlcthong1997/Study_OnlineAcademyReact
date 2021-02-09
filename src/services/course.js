import { axiosInstance, getToken } from '../utils/makeAPI';

export const getAllCourses = async (page = 1) => {
  try {
    let limit = 2;
    const result = await axiosInstance.get(`/courses?limit=${limit}&page=${page}`);
    return result.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
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
    let res = await axiosInstance.get('/courses/latest');
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data; // server return 204 => client handle return []
  }
}

export const getCourseByCategoryId = async (catId, page = 1) => {
  try {
    let limit = 2;
    let res = await axiosInstance.get(`/categories/${catId}/courses?limit=${limit}&page=${page}`);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return null;
  }
}

export const getCourseById = async (id) => {
  try {
    let res = await axiosInstance.get(`/courses/${id}`);
    return res.data;
  } catch (error) { // 400
    console.log(error.response.data);
    return null;
  }
}

export const getUserCourses = async () => {
  try {
    let res = await axiosInstance.get('/courses/registered', { headers: getToken() });
    return res.data;
  } catch (error) { //401
    console.log(error.response.data);
    return error.response.auth;
  }
}

export const create = async (data) => {
  try {
    let res = await axiosInstance.post('/courses', data, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) { // 400, 403, 401
    console.log(error.response.data);
    error.response.state = false; // 400
    return error.response;
  }
}

export const coursesOfTeacher = async () => {
  try {
    let res = await axiosInstance.get('/courses/teacher-of-courses', { headers: getToken() });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.auth;
  }
}