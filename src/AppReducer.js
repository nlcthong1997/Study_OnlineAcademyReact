import {
  INIT_HOME,
  CHANGE_HOME,
  LOGOUT,
  LOGIN_SUCCESS
} from './AppTypes';

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_HOME:
      return {
        ...state,
        categories: action.payload.categories,
        courses: action.payload.courses
      }
    case CHANGE_HOME:
      return {
        ...state,
        isShowAll: action.payload.isShowAll,
        courses: action.payload.courses
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