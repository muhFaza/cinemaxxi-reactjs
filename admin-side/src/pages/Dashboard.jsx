// import useFetchData from "../hooks/useFetchData";
import TableData from "../components/TableData";
import { useEffect } from "react";
import "../assets/custom.css";
import { useSelector, useDispatch } from "react-redux";
import { changeData, fetchAnyData } from "../stores/actionCreator";
import AddMovieModal from "../components/AddMovieModal";
import CastsModal from "../components/CastsModal";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Dashboard() {
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movie.movieData);
  const errorMovie = useSelector((state) => state.movie.error);
  const [isUseEffectDone, setIsUseEffectDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      await dispatch(fetchAnyData("/movies"));
      setIsUseEffectDone(true);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorMovie && isUseEffectDone) {
    toast.error(errorMovie, {
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

  function addMovie() {
    dispatch(changeData(false, "edit"));
    dispatch(
      changeData(
        {
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
        "addData"
      )
    );
    dispatch(changeData([1], "arr"));
  }

  return (
    <>
    {isUseEffectDone == false && (
      <div className="overlay">
        <Loading />
      </div>
    )}
      <div className="dashboard-section">
        <div className="container d-flex flex-column justify-content-center pt-5">
          <button
            className="btn btn-dark align-self-end my-3"
            style={{
              width: "120px",
              backgroundColor: "#222529",
              color: "#f2f2f2",
            }}
            data-toggle="modal"
            data-target="#addMovie"
            onClick={addMovie}
          >
            Add Movie
          </button>
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Movie Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Created By</th>
                  <th scope="col">Casts</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {movieData.map((movie, index) => (
                  <TableData key={movie.id} data={movie} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <AddMovieModal />
        <CastsModal />
      </div>
    </>
  );
}

export default Dashboard;
