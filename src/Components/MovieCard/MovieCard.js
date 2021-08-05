import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MovieCard.css";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination]);

function MovieCard({ data }) {
  const { id, title, poster_path, vote_average, backdrop_path, overview } =
    data;
  const moviePoster = "https://image.tmdb.org/t/p/w1280";
  const [click, setClick] = useState(false);
  const [reload, setReload] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [casts, setCast] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [imageSource, setImageSource] = useState("");
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    poster_path: "",
    vote_average: "",
    backdrop_path: "",
    overview: "",
  });
  const [isloading, setLoading] = useState(true);

  const getMovieTrailer = async (id) => {
    const trailer = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setTrailer(trailer.data.results.key);
  };

  const getMovieCast = async (id) => {
    const cast = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCast(cast.data.cast);
  };

  const getMovieRecommendation = async (id) => {
    const recommendation = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    setRecommend(recommendation.data.results);
    setLoading(false);
  };

  const showModal = () => {
    setClick(!click);
  };

  const reloadModal = () => {
    setReload(!reload);
  };

  const hideModal = () => {
    setClick(false);
  };

  return (
    <div className="movie-list-info">
      <img
        onClick={() => {
          showModal();
          getMovieTrailer(id);
          getMovieCast(id);
          getMovieRecommendation(id);
          setMovieDetails({
            id: id,
            title: title,
            poster_path: poster_path,
            vote_average: vote_average,
            backdrop_path: backdrop_path,
            overview: overview,
          });
          setImageSource(backdrop_path);
        }}
        src={moviePoster + poster_path}
        alt={title}
      />

      <div className="movie-info">
        <h5>{title}</h5>
        <span>{vote_average}</span>
      </div>

      {Object.keys(movieDetails).length > 0 ? (
        <div className={click ? "modal active" : "modal"}>
          {isloading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="modal-content">
              <span className="close" onClick={hideModal}>
                <i className="far fa-times-circle"></i>
              </span>
              <img
                className="movie-backdrop-path"
                src={moviePoster + imageSource}
                alt={movieDetails.title}
                onError={(e) =>
                  (e.target.src =
                    "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png")
                }
              />
              <div className="modal-movie-info">
                <h4>{movieDetails.title}</h4>
                <span>{movieDetails.vote_average}</span>
              </div>

              <div className="modal-movie-overview">
                <strong>Overview:</strong>
                <p>{movieDetails.overview}</p>
              </div>

              <strong className="title">Cast:</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={false}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-movie-cast">
                  {casts.map((cast) => (
                    <SwiperSlide>
                      <div className="modal-cast">
                        <img
                          src={moviePoster + cast.profile_path}
                          alt={cast.original_name}
                          onError={(e) =>
                            (e.target.src =
                              "https://cinemaone.net/images/movie_placeholder.png")
                          }
                        />

                        <div className="modal-cast-name">
                          <strong>
                            {cast.original_name.substring(0, 25)}...
                          </strong>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>

              <strong className="title">Recommend:</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-movie-recommend">
                  {recommend.map((recommend) => (
                    <SwiperSlide>
                      <div className="modal-recommend">
                        <img
                          onClick={() => {
                            reloadModal();
                            getMovieTrailer(recommend.id);
                            getMovieCast(recommend.id);
                            getMovieRecommendation(recommend.id);
                            setMovieDetails({
                              id: recommend.id,
                              title: recommend.title,
                              poster_path: recommend.poster_path,
                              vote_average: recommend.vote_average,
                              overview: recommend.overview,
                              backdrop_path: recommend.backdrop_path,
                            });
                            setImageSource(recommend.backdrop_path);
                            setLoading(true);
                          }}
                          src={moviePoster + recommend.poster_path}
                          alt={recommend.original_name}
                          onError={(e) =>
                            (e.target.src =
                              "https://cinemaone.net/images/movie_placeholder.png")
                          }
                        />

                        <div className="modal-cast-name">
                          <strong>
                            {recommend.original_title.substring(0, 25)}
                          </strong>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
              {/* <a href={`https://www.youtube.com/embed/` + trailer}>
                View Trailer
              </a> */}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MovieCard;
