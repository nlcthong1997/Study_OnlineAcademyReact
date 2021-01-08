import { fetchAPI } from '../utils/fetchAPI';

const baseUrl = 'http://localhost:3000/api';

export const getInitCategories = () => {
  return fetchAPI(baseUrl + '/categories');
}