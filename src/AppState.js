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
  isSearchAction: false,

  //auth
  role: localStorage.onlineAcademy_role || null,
  isLogged: localStorage.onlineAcademy_authenticated === 'true' ? true : false
}