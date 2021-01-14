import jwt_decode from "jwt-decode";
import { axiosInstance } from '../utils/makeAPI';

export const login = async ({ username, password }) => {
  try {
    let { data } = await axiosInstance.post('/auth', { username, password });
    if (data.authenticated) {
      let { userName } = jwt_decode(data.accessToken);
      localStorage.onlineAcademy_accessToken = data.accessToken;
      localStorage.onlineAcademy_refreshToken = data.refreshToken;
      localStorage.onlineAcademy_authenticated = data.authenticated;
      localStorage.onlineAcademy_userName = userName;
    }
    return data.authenticated;
  } catch (error) {
    console.log(error.response.data);
  }
}

export const logout = () => {
  delete localStorage.onlineAcademy_accessToken;
  delete localStorage.onlineAcademy_refreshToken;
  delete localStorage.onlineAcademy_authenticated;
  delete localStorage.onlineAcademy_userName;
}