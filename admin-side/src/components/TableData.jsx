/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeData, setFetchData } from "../stores/actionCreator";
import { toast } from "react-toastify";

function TableData({ data, index, setAddData }) {
  const page = useLocation().pathname;

  const dispatch = useDispatch();
  const genreData = useSelector((state) => state.genre.genreData);
  const movieData = useSelector((state) => state.movie.movieData);
  // const arr = useSelector((state) => state.movie.arr);

  const deleteData = async (id) => {
    try {
      const res = await fetch(
        "http://localhost:3000/admin/" +
          (page == "/" ? "movies/" : "genres/") +
          id,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      if (!res.ok) throw { name: "deleteError", message: "Failed to delete" };
      if (page == "/genre") {
        let temp = genreData.filter((gen) => gen.id != id);
        dispatch(setFetchData(temp, "genreData"));
      } else {
        let temp = movieData.filter((mov) => mov.id != id);
        dispatch(setFetchData(temp, "movieData"));
      }
      toast.success("Success delete", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return console.log("success delete movie");
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

  const editMovies = async (id) => {
    try {
      await dispatch(changeData(true, "edit"));
      await dispatch(changeData(id, "editId"));
      const selected = movieData.filter((el) => el.id == id)[0];
      selected.casts = selected.Casts;
      await dispatch(changeData(selected, "addData"));
      let totalCast = selected.Casts.length;
      // create an array of ones with length of totalCast
      totalCast = Array.from({ length: totalCast }, () => 1);
      await dispatch(changeData(totalCast, "arr"));
    } catch (error) {
      console.log(error);
    }
  };

  function viewCastsBtn(id) {
    const selected = movieData.filter((el) => el.id == id)[0];
    dispatch(changeData(selected.Casts, "viewCasts"));
  }

  if (page == "/") {
    return (
      <tr className="">
        <th className="align-middle" scope="row">
          {index + 1}
        </th>
        <td className="align-middle">{data.title}</td>
        <td className="align-middle">{data.Genre.name}</td>
        <td className="align-middle">{data.rating}</td>
        <td className="align-middle">{data.User.username}</td>
        <td className="align-middle">
          <button
            className="btn btn-outline-success"
            data-toggle="modal"
            data-target="#castsModal"
            onClick={() => viewCastsBtn(data.id)}
          >
            Show
          </button>
        </td>
        <td className="align-middle  col-2">
          <button
            style={{ margin: "0px 5px" }}
            onClick={() => deleteData(data.id)}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
          <button
            data-toggle="modal"
            data-target="#addMovie"
            style={{ margin: "0px 5px" }}
            onClick={() => editMovies(data.id)}
            className="btn btn-outline-warning"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  } else if (page == "/genre") {
    return (
      <tr className="">
        <th className="align-middle" scope="row">
          {index + 1}
        </th>
        <td className="align-middle">{data.name}</td>
        <td className="align-middle">
          {new Date(data.createdAt).toLocaleDateString("en-UK")}
        </td>
        <td className="align-middle">
          {new Date(data.updatedAt).toLocaleDateString("en-UK")}
        </td>
        <td className="align-middle  col-2">
          <button
            style={{ margin: "0px 5px" }}
            onClick={() => deleteData(data.id)}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
          <button
            data-toggle="modal"
            data-target="#addGenre"
            style={{ margin: "0px 5px" }}
            onClick={() =>
              setAddData({
                ...data,
                edit: true,
                editId: data.id,
                name: data.name,
              })
            }
            className="btn btn-outline-warning"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

export default TableData;
