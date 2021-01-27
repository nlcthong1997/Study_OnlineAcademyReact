import {
  INIT_MENU_HEADER,
  INIT_HOME,
  CHANGE_HOME,
  LOGOUT,
  LOGIN_SUCCESS
} from './AppTypes';

const reducer = (state, action) => {
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
    default:
      return state;
  }
}

export default reducer;