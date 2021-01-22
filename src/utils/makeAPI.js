import axios from 'axios';

export const axiosInstanceToken = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 5000,
  headers: { 'x-access-token': localStorage.onlineAcademy_accessToken }
});

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 5000
});