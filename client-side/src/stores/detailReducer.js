const initialValue = {
  detailMovie: {
    id: 29,
    title: "",
    slug: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: "",
    genreId: 1,
    authorId: 1,
    createdAt: "",
    updatedAt: "",
    Casts: [
      {
        id: 33,
        movieId: 29,
        name: "",
        profilePict: "",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 32,
        movieId: 29,
        name: "",
        profilePict: "",
        createdAt: "",
        updatedAt: "",
      },
      {
        id: 31,
        movieId: 29,
        name: "",
        profilePict: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    Genre: {
      id: 1,
      name: "",
      createdAt: "",
      updatedAt: "",
    },
  },
  error: "",
};

export default function detailReducer(state = initialValue, action) {
  switch (action.type) {
    case "GET_DETAIL":
      return {
        ...state,
        detailMovie: action.payload,
      };
    case "SET_ERROR_DETAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
