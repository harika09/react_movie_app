import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { BeatLoader } from "react-spinners";
import "./PeopleCard.css";

function PeopleCard({ data }) {
  const { id, name, profile_path, known_for_department, known_for } = data;
  const people_profile = "https://image.tmdb.org/t/p/w1280";
  const [peopeInfomation, setPeopleInformation] = useState({
    id: "",
    name: "",
    profile_path: "",
    known_for_department: "",
    known_for: [],
  });
  const [isloading, setLoading] = useState(true);
  const [imageSource, setImageSource] = useState("");
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");

  const [click, setClick] = useState(false);

  const showModal = () => {
    setClick(!click);
  };

  const hideModal = () => {
    setClick(false);
  };

  const getDetails = async (id) => {
    const peopleInfo = await Axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setLoading(false);
    setPeopleInfo(peopleInfo.data);
  };

  const getMovieList = async (id) => {
    const movieList = await Axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setMovieLists(movieList.data.cast);
  };

  const getSocialLinks = async (id) => {
    const socialLinks = await Axios.get(
      `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setFacebook(socialLinks.data.facebook_id);
    setInstagram(socialLinks.data.instagram_id);
    setTwitter(socialLinks.data.twitter_id);
  };

  return (
    <div className="people-list-info">
      <img
        loading="lazy"
        onClick={() => {
          showModal();
          getDetails(id);
          getMovieList(id);
          getSocialLinks(id);
          setPeopleInformation({
            id: id,
            name: name,
            profile_path: profile_path,
            known_for_department: known_for_department,
            known_for: known_for,
          });
          setImageSource(profile_path);
        }}
        src={people_profile + profile_path}
        alt={name}
        onError={(e) =>
          (e.target.src =
            "https://critics.io/img/movies/poster-placeholder.png")
        }
      />

      <div className="people-info">
        <h5>{name}</h5>
        <span>{known_for_department}</span>
      </div>

      {Object.keys(peopeInfomation).length > 0 ? (
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
                loading="lazy"
                className="people-profile-path"
                src={people_profile + imageSource}
                alt={peopeInfomation.name}
                onError={(e) =>
                  (e.target.src =
                    "https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png")
                }
              />
              <div className="modal-people-info">
                <h4>{peopeInfomation.name}</h4>
                <span>{peopeInfomation.known_for_department}</span>
              </div>

              <div className="social-media-accounts">
                <ul className="links">
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
              </div>

              <strong className="title">Biography</strong>
              <div className="people-biography">
                <div className="overview">
                  {Object.keys(peopleInfo).length > 0 ? (
                    <div className="people-overview">
                      <p>{peopleInfo.biography}</p>
                    </div>
                  ) : (
                    "No Data Found"
                  )}
                </div>
              </div>

              <strong className="title">Known For</strong>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={0}
                freeMode={true}
                loop={false}
                showsPagination={false}
                className="mySwiper"
              >
                <div className="modal-movie-recommend actor-movie-list">
                  {movieLists.map((list) => (
                    <SwiperSlide>
                      <div className="modal-recommend">
                        <img
                          src={people_profile + list.poster_path}
                          alt={list.original_title}
                          onError={(e) =>
                            (e.target.src =
                              "https://cinemaone.net/images/movie_placeholder.png")
                          }
                        />
                        <span></span>
                      </div>
                    </SwiperSlide>
                  ))}
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

export default PeopleCard;
