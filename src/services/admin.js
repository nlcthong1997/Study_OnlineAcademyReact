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

export const adminCreateTeacher = async (data) => {
  try {
    return await axiosInstance.post(`admin/teachers`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminGetCategories = async () => {
  try {
    return await axiosInstance.get('admin/categories', { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminCreateCategory = async (data) => {
  try {
    return await axiosInstance.post(`admin/categories`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminUpdateCategory = async (data, id) => {
  try {
    return await axiosInstance.put(`admin/categories/${id}`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminGetAccountTeacher = async () => {
  try {
    return await axiosInstance.get('admin/accounts', { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}

export const adminUpdatePassword = async (data, id) => {
  try {
    return await axiosInstance.put(`admin/teachers/${id}/reset-password`, data, { headers: getToken() })
  } catch (error) {
    return error.response;
  }
}
