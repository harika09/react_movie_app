import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { BeatLoader } from "react-spinners";
import "./TvCards.css";

function TvCards({ data }) {
  const {
    backdrop_path,
    original_name,
    id,
    poster_path,
    vote_average,
    overview,
  } = data;
  const TvPoster = "https://image.tmdb.org/t/p/w1280";
  const [showDetails, setShowDetails] = useState({
    backdrop_path: "",
    original_name: "",
    id: "",
    poster_path: "",
    vote_average: "",
  });
  const [isloading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const [reload, setReload] = useState(false);
  const [casts, setCast] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [imageSource, setImageSource] = useState("");
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [imdb, setImdb] = useState("");

  const getTvShowCast = async (id) => {
    const cast = await Axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCast(cast.data.cast);
  };

  const getTvShowRecommend = async (id) => {
    const recommend = await Axios.get(
      `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setRecommend(recommend.data.results);
    setLoading(false);
  };

  const getTvShowTrailer = async (id) => {
    const getTrailer = await Axios.get(
      `https://api.themoviedb.org/3/tv/${id}}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setTrailer(getTrailer.data.results);
  };

  const getSocialMedia = async (id) => {
    const socialAccounts = await Axios.get(
      `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setFacebook(socialAccounts.data.facebook_id);
    setTwitter(socialAccounts.data.twitter_id);
    setInstagram(socialAccounts.data.instagram_id);
    setImdb(socialAccounts.data.imdb_id);
  };

  const getTvDetails = async (id) => {
    const tvInfo = await Axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(tvInfo.data.genres);
    setSeasons(tvInfo.data.seasons);
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
    <div className="tv-shows-list">
      <img
        src={TvPoster + poster_path}
        alt={original_name}
        onError={(e) =>
          (e.target.src =
            "https://critics.io/img/movies/poster-placeholder.png")
        }
        onClick={() => {
          showModal();
          getTvShowCast(id);
          getTvShowRecommend(id);
          getSocialMedia(id);
          getTvShowTrailer(id);
          getTvDetails(id);
          setShowDetails({
            backdrop_path: backdrop_path,
            original_name: original_name,
            id: id,
            poster_path: poster_path,
            vote_average: vote_average,
            overview: overview,
          });
        }}
      />

      <div className="tv-shows-info">
        <h5>{original_name}</h5>
        <span>{vote_average}</span>
      </div>

      {Object.keys(showDetails).length > 0 ? (
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
                className="tv-shows-backdrop"
                src={TvPoster + showDetails.backdrop_path}
                alt={showDetails.original_name}
                onError={(e) => {
                  e.target.src =
                    "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png";
                }}
              />

              <div className="modal-tv-shows-info">
                <h4>{showDetails.original_name}</h4>
                <span>{showDetails.vote_average}</span>
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
                    <a href={`https://www.imdb.com/title/${imdb}`}>
                      <i className="fab fa-imdb"></i>
                    </a>
                  </li>

                  <li>
                    <a href={`https://www.facebook.com/${facebook}`}>
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>

                  <li>
                    <a href={`https://www.instagram.com/${instagram}`}>
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>

                  <li>
                    <a href={`https://twitter.com/${twitter}`}>
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

              <div className="modal-tv-shows-overview">
                <strong>Overview:</strong>
                <p>{showDetails.overview}</p>
              </div>

              <strong className="title">Cast</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={false}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-tv-show-cast">
                  {casts.length > 0 ? (
                    casts.map((cast) => (
                      <SwiperSlide>
                        <div key={cast.id} className="modal-cast">
                          <img
                            src={TvPoster + cast.profile_path}
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

              <strong className="title">Seasons</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-tv-show-season">
                  {seasons.length > 0 ? (
                    seasons.map((season) => (
                      <SwiperSlide>
                        <div key={season.id} className="modal-season">
                          <img
                            src={TvPoster + season.poster_path}
                            alt={season.name}
                            onError={(e) =>
                              (e.target.src =
                                "https://cinemaone.net/images/movie_placeholder.png")
                            }
                          />

                          <div className="modal-cast-name">
                            <strong>{season.name.substring(0, 20)}</strong>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <div className="no-data">No Data Found</div>
                  )}
                </div>
              </Swiper>

              <strong className="title">Recommend</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-tv-show-recommend">
                  {recommend.length > 0 ? (
                    recommend.map((recommend) => (
                      <SwiperSlide>
                        <div key={recommend.id} className="modal-recommend">
                          <img
                            onClick={() => {
                              reloadModal();
                              getTvShowCast(recommend.id);
                              getTvShowRecommend(recommend.id);
                              getTvDetails(recommend.id);
                              setShowDetails({
                                id: recommend.id,
                                original_name: recommend.original_name,
                                poster_path: recommend.poster_path,
                                vote_average: recommend.vote_average,
                                overview: recommend.overview,
                                backdrop_path: recommend.backdrop_path,
                              });
                              setImageSource(recommend.backdrop_path);
                              setLoading(true);
                            }}
                            src={TvPoster + recommend.poster_path}
                            alt={recommend.original_name}
                            onError={(e) =>
                              (e.target.src =
                                "https://cinemaone.net/images/movie_placeholder.png")
                            }
                          />

                          <div className="modal-cast-name">
                            <strong>
                              {recommend.original_name.substring(0, 20)}
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
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TvCards;
