const initialState = {
  genreData: [],
  error: ""
};

export const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case "childSetFetchData":
      return {
        ...state,
        [action.state]: action.payload,
      };
    case "childChangeData":
      return {
        ...state,
        [action.state]: action.payload,
      };
    case "SET_ERROR_GENRE":
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};