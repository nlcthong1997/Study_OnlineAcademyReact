import axios from 'axios';

export const axiosInstanceToken = axios.create({
  baseURL: 'http://localhost:3030/api',
  timeout: 5000,
  headers: { 'x-access-token': localStorage.onlineAcademy_accessToken }
});

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030/api',
  timeout: 5000
});