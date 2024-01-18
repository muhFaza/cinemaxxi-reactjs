export function fetchURLData(url) {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3000/user" + url);
      if (!res.ok) throw { name: "Error Fetching Movie Data" };
      const data = await res.json();
      await dispatch(setMovieData(data));
      await dispatch(setError("", "movie"));
    } catch (error) {
      console.log(error);
      await dispatch(setError(error.name, "movie"));
    }
  };
}

export function fetchDetailData(url, slug, detail) {
  return async (dispatch) => {
    try {
      let data;
      if (!detail) {
        const res = await fetch("http://localhost:3000/user" + url);
        if (!res.ok) throw { name: "Error Fetching Movie detail" };
        data = await res.json();
        await dispatch(setMovieData(data));
        let find = data.find((movie) => movie.slug === slug);
        await dispatch(setDetailMovie(find));
      } else {
        await dispatch(setDetailMovie(detail));
      }
      await dispatch(setError("", "detail"));
    } catch (error) {
      console.log(error);
      await dispatch(setError(error.name, "detail"));
    }
  };
}

export function setError(error, reducer) {
  if (reducer == "movie") return { type: "SET_ERROR_MOVIE", payload: error };
  else return { type: "SET_ERROR_DETAIL", payload: error };
}

export function setDetailMovie(data) {
  return { type: "GET_DETAIL", payload: data };
}

export function setMovieData(data) {
  return { type: "GET_MOVIES", payload: data };
}
