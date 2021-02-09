import jwt_decode from "jwt-decode";
import { axiosInstance } from '../utils/makeAPI';

export const login = async ({ username, password }) => {
  try {
    let { data } = await axiosInstance.post('/auth', { username, password });
    console.log('data', data);
    let { userName, role } = jwt_decode(data.accessToken);
    if (data.authenticated) {
      localStorage.onlineAcademy_accessToken = data.accessToken;
      localStorage.onlineAcademy_refreshToken = data.refreshToken;
      localStorage.onlineAcademy_authenticated = data.authenticated;
      localStorage.onlineAcademy_role = role;
      localStorage.onlineAcademy_userName = userName;
    }
    data.role = role;
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const loginGoogle = async (tokenId) => {
  try {
    let { data } = await axiosInstance.post('/auth/google', { tokenId });
    let { userName, role } = jwt_decode(data.accessToken);
    if (data.authenticated) {
      localStorage.onlineAcademy_accessToken = data.accessToken;
      localStorage.onlineAcademy_refreshToken = data.refreshToken;
      localStorage.onlineAcademy_authenticated = data.authenticated;
      localStorage.onlineAcademy_role = role;
      localStorage.onlineAcademy_userName = userName;
    }
    data.role = role;
    return data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

export const logout = () => {
  delete localStorage.onlineAcademy_accessToken;
  delete localStorage.onlineAcademy_refreshToken;
  delete localStorage.onlineAcademy_authenticated;
  delete localStorage.onlineAcademy_role;
  delete localStorage.onlineAcademy_userName;
}

export const signup = async (data) => {
  let res = await axiosInstance.post('/users', data);
  if (res.status === 201) {
    return true;
  }
  return false;
}