export const initialState = {
  //menu header
  categories: [],

  // home
  courses: [],
  paginate: {
    totalItems: 0,
    totalPages: 0,
    limit: 0,
    qty: 0,
    currentPage: 0,
    uri: '',
    baseUrl: ''
  },
  isShowAll: true,
  role: 'teacher',

  //auth
  isLogged: localStorage.onlineAcademy_authenticated === 'true' ? true : false
}