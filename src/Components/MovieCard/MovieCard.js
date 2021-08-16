import React, { useState, useRef } from "react";
import Axios from "axios";
import SwiperCore, { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BeatLoader } from "react-spinners";
import "./MovieCard.css";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// install Swiper modules
SwiperCore.use([Scrollbar]);

function MovieCard({ data }) {
  const {
    id,
    title,
    poster_path,
    vote_average,
    backdrop_path,
    overview,
    original_name,
  } = data;
  const moviePoster = "https://image.tmdb.org/t/p/w1280";
  const [click, setClick] = useState(false);
  const [reload, setReload] = useState(false);
  const [playing, setPLaying] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [casts, setCast] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [imageSource, setImageSource] = useState("");
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    poster_path: "",
    vote_average: "",
    backdrop_path: "",
    overview: "",
    original_name: "",
  });
  const [genres, setGenres] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [imdb, setImdb] = useState("");

  const getMovieTrailer = async (id) => {
    const trailer = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setTrailer(trailer.data.results);
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

  const getSocialMedia = async (id) => {
    const socialAccounts = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`
    );

    setFacebook(socialAccounts.data.facebook_id);
    setTwitter(socialAccounts.data.twitter_id);
    setInstagram(socialAccounts.data.instagram_id);
    setImdb(socialAccounts.data.imdb_id);
  };

  const getMovieDetails = async (id) => {
    const movieDetails = await Axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(movieDetails.data.genres);
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
          getMovieDetails(id);
          getSocialMedia(id);
          setMovieDetails({
            id: id,
            title: title,
            original_name: original_name,
            poster_path: poster_path,
            vote_average: vote_average,
            backdrop_path: backdrop_path,
            overview: overview,
          });
          setImageSource(backdrop_path);
        }}
        src={moviePoster + poster_path}
        alt={title}
        onError={(e) =>
          (e.target.src =
            "https://critics.io/img/movies/poster-placeholder.png")
        }
      />

      <div className="movie-info">
        <h5>{title}</h5>
        <span>{vote_average}</span>
      </div>

      {Object.keys(movieDetails).length > 0 ? (
        <div className={click ? "modal active" : "modal"}>
          {isloading ? (
            <div className="loading">
              <BeatLoader loading color="#e98580" />
            </div>
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

              <div className="movie-genres">
                {genres.length > 0 ? (
                  genres.map((genre) => (
                    <ul className="genres-list">
                      <li>{genre.name}</li>
                    </ul>
                  ))
                ) : (
                  <div className="no-data">No Genres Found</div>
                )}
              </div>

              <div className="social-media-accounts">
                <ul className="links">
                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={`https://www.imdb.com/title/${imdb}`}
                    >
                      <i className="fab fa-imdb"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={`https://www.facebook.com/${facebook}`}
                    >
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={`https://www.instagram.com/${instagram}`}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={`https://twitter.com/${twitter}`}
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                </ul>

                <ul className="trailer">
                  <li>
                    <div className="modal-trailer">
                      {trailer[0] !== undefined ? (
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          href={`https://www.youtube.com/embed/${trailer[0].key}`}
                        >
                          <i className="fas fa-play"></i> Play Trailer
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="modal-movie-overview">
                <strong>Overview</strong>
                <p>{movieDetails.overview}</p>
              </div>

              <div className="movie-cast-list">
                <strong className="title">Cast</strong>
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={0}
                  freeMode={true}
                  loop={false}
                  showsPagination={false}
                  className="mySwiper"
                >
                  <div className="modal-movie-cast">
                    {casts.length > 0 ? (
                      casts.map((cast) => (
                        <SwiperSlide>
                          <div className="modal-cast">
                            <img
                              loading="lazy"
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
                      ))
                    ) : (
                      <div className="no-data">No Cast Found</div>
                    )}
                  </div>
                </Swiper>
              </div>

              <div className="movie-recommend-list">
                <strong className="title">Recommendations</strong>
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={0}
                  freeMode={true}
                  loop={false}
                  showsPagination={false}
                  className="mySwiper"
                >
                  <div className="modal-movie-recommend">
                    {recommend.length > 0 ? (
                      recommend.map((recommend) => (
                        <SwiperSlide>
                          <div className="modal-recommend">
                            <img
                              loading="lazy"
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
                                {recommend.original_title.substring(0, 20)}
                              </strong>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <div className="no-data">No Recommendation Found</div>
                    )}
                  </div>
                </Swiper>
              </div>
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
