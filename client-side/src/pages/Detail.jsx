import { useEffect } from "react";
import "../assets/detail.css";
import "../assets/XXI.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailData } from "../stores/actionCreator";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../components/Loading";

export default function Detail() {
  const moviesData = useSelector((state) => state.movie.moviesData);
  const detailMovie = useSelector((state) => state.detail.detailMovie);
  const detailError = useSelector((state) => state.detail.error);
  const [useEffectCompleted, setUseEffectCompleted] = useState(false);
  const location = useLocation();
  const slug = location.pathname.replace("/", "");

  const dispatch = useDispatch();

  useEffect(() => {
    // if data is fetched, no need to fetch again
    async function fetchData() {
      if (moviesData.length == 0) {
        await dispatch(fetchDetailData("/movies", slug, null));
      } else {
        let detail = moviesData.find((movie) => movie.slug == slug);
        await dispatch(fetchDetailData("/movies", slug, detail));
      }
      setUseEffectCompleted(true);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (detailError && useEffectCompleted) {
    toast.error(detailError, {
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
      <div className="container">
        <div className="container-wrap" style={{ marginTop: "100px" }}>
          <div className="container clear-fix">
            <div id="detail" className="row">
              <div className="col-12">
                <div className="single-title">
                  <h3>DETAIL</h3>
                </div>
              </div>
            </div>
            <div className="main-content main-detail">
              <div className="row">
                <div className="col-4">
                  <div className="poster-box">
                    <a
                      data-lightbox="inline"
                      style={{
                        backgroundColor: "#fff !important",
                        padding: "0px",
                      }}
                    >
                      <img src={detailMovie.imgUrl} alt={detailMovie.title} />
                    </a>
                  </div>
                </div>
                <div className="col-8">
                  <div className="desc-box">
                    <h2>{detailMovie.title}</h2>
                    <ul className="desc-movie">
                      <li className="movie_produser">
                        <span>Rating</span>
                        {detailMovie.rating}
                      </li>
                      <li className="movie_genre">
                        <span>Genre</span> {detailMovie.Genre.name}
                      </li>
                      <li className="movie_produser">
                        <span>Casts</span>{" "}
                        {detailMovie.Casts.map((cast) => cast.name).join(", ")}
                      </li>
                    </ul>
                    <div className="">
                      <div className="desc-links">
                        <a href={detailMovie.trailerUrl} target="_blank" data-lightbox="inline" rel="noreferrer">
                          Watch Trailer
                        </a>
                      </div>
                    </div>
                    <div className="desc-synopsis">
                      <h4>SYNOPSIS</h4>
                      <p>{detailMovie.synopsis}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
