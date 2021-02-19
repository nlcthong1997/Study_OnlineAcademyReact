import { axiosInstance, getToken } from '../utils/makeAPI';

export const getUser = async () => {
  try {
    return await axiosInstance.get('/users/info', { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const update = async (data) => {
  try {
    return await axiosInstance.put('/users', data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const changePassword = async (data) => {
  try {
    return await axiosInstance.put('users/change-password', data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}