const initialValue = {
  moviesData: [],
  error: "",
};

export default function reducer(state = initialValue, action) {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        moviesData: action.payload,
      };
    case "GET_GENRE":
      return {
        ...state,
        genreData: action.payload,
      };
    case "SET_ERROR_MOVIE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
