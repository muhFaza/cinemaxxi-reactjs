/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { fetchAnyData } from "../stores/actionCreator";
import MainCastForm from "./MainCastForm";
import { toast } from "react-toastify";

export default function AddMovieModal() {
  const addData = useSelector((state) => state.movie.addData);
  const arr = useSelector((state) => state.movie.arr);
  const edit = useSelector((state) => state.movie.edit);
  const editId = useSelector((state) => state.movie.editId);
  const genreData = useSelector((state) => state.movie.genreData);
  const dispatch = useDispatch();

  const submitAddForm = async (e) => {
    try {
      e.preventDefault();
      let res, msg;
      if (!edit) {
        res = await fetch("http://localhost:3000/admin/movies", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            ...addData,
          }),
        });
        msg = 'success add new movie'
      } else {
        res = await fetch("http://localhost:3000/admin/movies/" + editId, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            ...addData,
          }),
        });
        msg = 'success edit movie'
      }

      if (!res.ok) throw { name: "postError", message: "Failed to post data" };

      dispatch({
        type: "changeData",
        state: "arr",
        payload: [1],
      });
      dispatch({
        type: "changeData",
        state: "addData",
        payload: {
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
      });
      await dispatch(fetchAnyData("/movies"));
      document.getElementById("addMovie").click();
      console.log("success add new movie");
      toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const addForm = (e) => {
    dispatch({
      type: "changeData",
      state: "addData",
      payload: { ...addData, [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="addMovie"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-white bg-dark">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">
                {edit ? "Edit" : "Add"} Movie
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span style={{ color: "#f2f2f2" }} aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <form onSubmit={submitAddForm}>
              <div className="modal-body mx-3">
                <div className="md-form my-3">
                  <input
                    onChange={addForm}
                    value={addData.title}
                    className="form-control"
                    placeholder="Movie Title"
                    type="text"
                    name="title"
                    id="title"
                    required
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="title"
                  >
                    Movie Title
                  </label>
                </div>
                <div className="md-form mb-3">
                  <textarea
                    onChange={addForm}
                    value={addData.synopsis}
                    className="form-control"
                    placeholder="Synopsis ..."
                    name="synopsis"
                    id="synopsis"
                    required
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="synopsis"
                  >
                    Synopsis
                  </label>
                </div>
                <div className="md-form mb-3">
                  <input
                    onChange={addForm}
                    value={addData.trailerUrl}
                    className="form-control"
                    placeholder="Trailer URL"
                    type="text"
                    name="trailerUrl"
                    id="trailerUrl"
                    required
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="trailerUrl"
                  >
                    Trailer URL
                  </label>
                </div>
                <div className="md-form mb-3">
                  <input
                    onChange={addForm}
                    value={addData.imgUrl}
                    className="form-control"
                    placeholder="Image URL"
                    type="text"
                    name="imgUrl"
                    id="imgUrl"
                    required
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="imgUrl"
                  >
                    Image URL
                  </label>
                </div>
                <div className="md-form d-flex justify-content-between">
                  <div>
                    <input
                      onChange={addForm}
                      value={addData.rating}
                      className="form-control"
                      placeholder="Movie Rating"
                      type="number"
                      name="rating"
                      id="rating"
                      step=".1"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="rating"
                    >
                      Rating
                    </label>
                  </div>
                  <div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="genreId"
                      id="genreId"
                      value={addData.genreId}
                      onChange={(e) => addForm(e)}
                    >
                      {genreData.map((el, idx) => (
                        <option key={"genre" + idx} value={el.id}>
                          {el.name}
                        </option>
                      ))}
                    </select>
                    <label
                      data-error="wrong"
                      data-success="right"
                      htmlFor="genreId"
                    >
                      Genre
                    </label>
                  </div>
                </div>
                {edit === false && (
                  <>
                    <div className="separator mb-3"> Main Casts </div>
                    {arr.map((cast, index) => (
                      <MainCastForm key={"cast" + index} index={index} />
                    ))}
                  </>
                )}
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button className="btn btn-secondary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
