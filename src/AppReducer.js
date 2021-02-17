import {
  INIT_MENU_HEADER,
  INIT_HOME,
  LOGOUT,
  LOGIN_SUCCESS,
  SEARCH_ACTION
} from './AppTypes';

const reducer = (state, action) => {
  state = {
    ...state,
    role: localStorage.onlineAcademy_role || null
  }
  switch (action.type) {
    case INIT_MENU_HEADER:
      return {
        ...state,
        categories: action.payload.categories,
      }
    case INIT_HOME: {
      return {
        ...state,
        courses: action.payload.courses,
        paginate: action.payload.paginate
      }
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: action.payload.isLogged
      }
    case LOGOUT:
      return {
        ...state,
        isLogged: action.payload.isLogged
      }
    case SEARCH_ACTION:
      return {
        ...state,
        isSearchAction: action.payload.isSearchAction
      }
    default:
      return state;
  }
}

export default reducer;