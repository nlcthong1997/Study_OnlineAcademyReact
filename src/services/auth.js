import jwt_decode from "jwt-decode";
import { axiosInstance } from '../utils/makeAPI';

export const login = async ({ username, password }) => {
  try {
    let res = await axiosInstance.post('/auth', { username, password });
    let { userName, role } = jwt_decode(res.data.accessToken);
    if (res.data.authenticated) {
      localStorage.onlineAcademy_accessToken = res.data.accessToken;
      localStorage.onlineAcademy_refreshToken = res.data.refreshToken;
      localStorage.onlineAcademy_authenticated = res.data.authenticated;
      localStorage.onlineAcademy_role = role;
      localStorage.onlineAcademy_userName = userName;
    }
    res.data.role = role;
    return res;
  } catch (error) {
    return error.response;
  }
}

export const loginGoogle = async (tokenId) => {
  try {
    let res = await axiosInstance.post('/auth/google', { tokenId });
    let { userName, role } = jwt_decode(res.data.accessToken);
    if (res.data.authenticated) {
      localStorage.onlineAcademy_accessToken = res.data.accessToken;
      localStorage.onlineAcademy_refreshToken = res.data.refreshToken;
      localStorage.onlineAcademy_authenticated = res.data.authenticated;
      localStorage.onlineAcademy_role = role;
      localStorage.onlineAcademy_userName = userName;
    }
    res.data.role = role;
    return res;
  } catch (error) {
    return error.response;
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
  try {
    await axiosInstance.post('/users', data);
    return true;
  } catch (error) {
    return false;
  }
}