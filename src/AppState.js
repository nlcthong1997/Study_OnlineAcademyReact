export const initialState = {
  //menu header
  categories: [],

  // home
  courses: [],
  paginate: {
    total: 0,
    qty: 0,
    page: 1
  },
  isShowAll: true,

  //auth
  isLogged: localStorage.onlineAcademy_authenticated || false
}