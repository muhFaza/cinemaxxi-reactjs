const initialState = {
  counter: 0,
  movieData: [],
  addData: {
    title: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: "",
    genreId: "",
    casts: [
      {
        name: "",
        profilePict: "",
      },
    ],
  },
  genreData: [],
  viewCasts: [],
  edit: false,
  editId: "",
  arr: [1],
  error: "",
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + (action.payload || 1),
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - (action.payload || 1),
      };
    case "setFetchData":
      return {
        ...state,
        [action.state]: action.payload,
      };
    case "changeData":
      return {
        ...state,
        [action.state]: action.payload,
      }
    case "SET_ERROR_MOVIE":
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

