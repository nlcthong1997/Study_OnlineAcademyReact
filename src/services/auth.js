import { axiosInstance } from '../utils/makeAPI';

export const login = async ({ username, password }) => {
  try {
    const { status, data } = await axiosInstance.post('/auth', { username, password });
    if (data.authenticated) {
      localStorage.onlineAcademy_accessToken = data.accessToken;
      localStorage.onlineAcademy_refreshToken = data.refreshToken;
      localStorage.onlineAcademy_userInfo = {
        userId: data.userId,
        userName: data.userName,
        fullName: data.fullName
      };
    }
    return data.authenticated;
  } catch (error) {
    console.log(error.response.data);
  }
}

export const logout = () => {
  delete localStorage.onlineAcademy_accessToken;
  delete localStorage.onlineAcademy_refreshToken;
  delete localStorage.onlineAcademy_userInfo;
}