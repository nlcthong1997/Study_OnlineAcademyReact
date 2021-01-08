import {
  INIT_HOME,
  CHANGE_HOME
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
    default:
      return state;
  }
}

export default reducer;