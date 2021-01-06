const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        categories: action.payload.categories
      }
    default:
      return state;
  }
}

export default reducer;