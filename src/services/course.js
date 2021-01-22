import { axiosInstance } from '../utils/makeAPI';

export const getInitCourses = async () => {
  try {
    const subscribed = await axiosInstance.get('/courses/most-subscribed');
    const highlights = await axiosInstance.get('/courses/highlights-last-week');
    const mostView = await axiosInstance.get('/courses/most-view');
    const latest = await axiosInstance.get('/courses/latest');
    return {
      subscribed: subscribed.data,
      highlights: highlights.data,
      mostView: mostView.data,
      latest: latest.data
    }
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const getCourseByCategoryId = async (catId) => {
  try {
    let { data } = await axiosInstance.get(`/categories/${catId}/courses`);
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