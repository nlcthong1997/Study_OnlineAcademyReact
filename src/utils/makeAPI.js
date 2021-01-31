import axios from 'axios';

export const getToken = () => {
  return { 'x-access-token': localStorage.onlineAcademy_accessToken }
}

const setToken = (token) => {
  localStorage.onlineAcademy_accessToken = token;
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 300000
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 204) {
      response.data = [];
    }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null
    const type = error.response ? error.response.data.type : null
    const originalRequest = error.config;
    if (status === 401 && type === 'invalid_token') {
      return axiosInstance
        .post('auth/refresh', {
          accessToken: localStorage.onlineAcademy_accessToken,
          refreshToken: localStorage.onlineAcademy_refreshToken
        })
        .then(res => {
          const accessToken = res.data.accessToken;
          setToken(accessToken);
          originalRequest.headers['x-access-token'] = accessToken;
          return axiosInstance(originalRequest);
        })
        .catch(err => {
          console.log('Call refresh: ', err)
          delete localStorage.onlineAcademy_accessToken;
          delete localStorage.onlineAcademy_refreshToken;
          delete localStorage.onlineAcademy_authenticated;
          delete localStorage.onlineAcademy_userName;
          err.response.auth = { authenticated: false };
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);