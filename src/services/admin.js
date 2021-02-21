import { axiosInstance, getToken } from '../utils/makeAPI';

export const adminGetCourses = async () => {
  try {
    return await axiosInstance.get(`/admin/courses`, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const adminUpdateCourse = async (data, id) => {
  try {
    return await axiosInstance.put(`/admin/courses/${id}`, data, { headers: getToken() });
  } catch (error) {
    return error.response;
  }
}

export const adminGetStudents = async () => {
  try {
    return await axiosInstance.get('admin/students', { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminUpdateStudent = async (data, id) => {
  try {
    return await axiosInstance.put(`admin/students/${id}`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminGetTeachers = async () => {
  try {
    return await axiosInstance.get('admin/teachers', { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminUpdateTeacher = async (data, id) => {
  try {
    return await axiosInstance.put(`admin/teachers/${id}`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

