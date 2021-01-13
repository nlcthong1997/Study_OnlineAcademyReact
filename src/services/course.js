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
  }
}

export const getCourseByCategoryId = async (catId) => {
  try {
    let course = await axiosInstance.get(`/categories/${catId}/courses`);
    return course.data;
  } catch (error) {
    console.log(error.response.data);
  }
}