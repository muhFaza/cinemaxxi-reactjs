// Action creators for reducers
export const setFetchData = (payload, state) => ({
  type: state == "movieData" ? "setFetchData" : "childSetFetchData",
  payload,
  state,
});

export const changeData = (payload, state) => ({
  type: "changeData",
  payload,
  state,
});

export const fetchAnyData = (url) => async (dispatch) => {
  try {
    let res = await fetch("http://localhost:3000/admin" + url, {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw { name: "fetchError", message: "Fetching data for \"" + url + "\" failed" };
    res = await res.json();

    // if fetching movie, fetch genre too
    if (url == '/movies'){
      await dispatch(setFetchData(res, url == "/movies" ? "movieData" : "genreData"));
      await dispatch(fetchGenreData('/genres'))
    } else {
      await dispatch(setFetchData(res, url == "/movies" ? "movieData" : "genreData"));
      await dispatch(unsetError(url));
    }
  } catch (error) {
    console.log(error);
    await dispatch(setError(url, error.message));
  }
};
export function unsetError (url) {
  if (url == '/movies') return {type: 'SET_ERROR_MOVIE', payload: ''};
  else return {type: 'SET_ERROR_GENRE', payload: ''};
}
export function setError (url, payload) {
  if (url == '/movies') return {type: 'SET_ERROR_MOVIE', payload}
  else return {type: 'SET_ERROR_GENRE', payload}
}

// genreData for movies select input not for genre
export const fetchGenreData = (url) => async (dispatch) => {
  try {
    let res = await fetch("http://localhost:3000/admin" + url, {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw { name: "fetchError", message: "Fetch genre for select input failed" };
    res = await res.json();
    console.log(res);
    await dispatch({
      type: 'setFetchData',
      payload: res,
      state: 'genreData'
    });
    await dispatch(unsetError('/movies'));
  } catch (error) {
    console.log(error);
    return await dispatch(setError('/movies', error.message));
  }
};