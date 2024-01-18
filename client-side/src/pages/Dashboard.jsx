import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/XXI.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchURLData } from "../stores/actionCreator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function Dashboard() {
  const moviesData = useSelector((state) => state.movie.moviesData);
  const errorMovies = useSelector((state) => state.movie.error);
  const [useEffectCompleted, setUseEffectCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchURLData("/movies"));
      setUseEffectCompleted(true);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorMovies && useEffectCompleted) {
    toast.error(errorMovies, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      {useEffectCompleted == false && (
        <div className="overlay">
          <Loading />
        </div>
      )}
      <div className="container clearfix">
        <div id="now-playing" className="row topmargin clearfix">
          {moviesData.map((movie, index) => (
            <div key={"movie_" + index} className="col-3">
              <div className="movie">
                <Link to={"/" + movie.slug}>
                  <div className="movie-poster">
                    <img
                      src={movie.imgUrl}
                      alt="The Piper"
                      width="290"
                      height="426"
                    />
                  </div>
                  <div className="movie-desc">
                    <h4>{movie.title}</h4>
                    <span className="movie-label">
                      <img
                        src="https://21cineplex.com//theme/v5/assets/img/icons/labels/r13.png"
                        alt="R13+"
                      />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
