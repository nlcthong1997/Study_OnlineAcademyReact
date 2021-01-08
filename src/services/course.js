import { fetchAPI } from '../utils/fetchAPI';

const baseUrl = 'http://localhost:3000/api';

export const getInitCourses = async () => {
  const subscribed = await fetchAPI(baseUrl + '/courses/most-subscribed');
  const highlights = await fetchAPI(baseUrl + '/courses/highlights-last-week');
  const mostView = await fetchAPI(baseUrl + '/courses/most-view');
  const latest = await fetchAPI(baseUrl + '/courses/latest');
  return { subscribed, highlights, mostView, latest }
}

export const getCourseByCategoryId = (catId) => {
  return fetchAPI(baseUrl + `/categories/${catId}/courses`);
}