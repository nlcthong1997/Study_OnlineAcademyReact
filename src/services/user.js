import { axiosInstance, getToken } from '../utils/makeAPI';

export const getUser = async () => {
  try {
    let res = await axiosInstance.get('/users/info', { headers: getToken() });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.auth;
  }
}

export const update = async (data) => {
  try {
    let res = await axiosInstance.put('/users', data, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) {
    error.response.state = false;
    return error.response;
  }
}

export const changePassword = async (data) => {
  try {
    let res = await axiosInstance.put('users/change-password', data, { headers: getToken() });
    res.data.state = true;
    return res.data;
  } catch (error) { //400, 401
    console.log(error.response.data);
    error.response.state = false;
    return error.response;
  }
}