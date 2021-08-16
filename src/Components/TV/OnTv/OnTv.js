import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BeatLoader } from "react-spinners";
import TvCards from "../TvCards/TvCards";
import Swal from "sweetalert2";
import "../Popular/PopularShows.css";

function OnTv() {
  let PAGE_NUMBER = 1;
  let [page, setPage] = useState(PAGE_NUMBER);
  const [maxPage, setMaxPage] = useState("");
  const [tvShows, setTvSHows] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const errorMessage = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `No Movie Found for ${search}`,
    });
  };

  const errorEmptyMessage = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Empty Field`,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchMovies();
    setTvSHows("");
  };

  const loadPopular = async () => {
    const tvShows = await Axios.get(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );

    setTvSHows((prev) => [...prev, ...tvShows.data.results]);
    setMaxPage(tvShows.data.total_pages);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const searchMovies = async () => {
    if (!search.trim()) {
      errorEmptyMessage();
      setSearch("");
      return loadPopular();
    }
    const query = await Axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&query=${search}&include_adult=false`
    );
    // setMovie((prev) => [...prev, ...searchMovie.data.results]);

    setTvSHows((prev) => [...prev, ...query.data.results]);
    setMaxPage(query.data.total_pages);
    if (query.data.total_results === 0) {
      setSearch("");
      errorMessage();
      return loadPopular();
    }
    setLoading(false);
  };

  useEffect(() => {
    window.onscroll = infiniteScroll;
    if (!search.trim()) {
      loadPopular();
      setLoading(false);
    } else {
      searchMovies();
    }
    // This variable is used to remember if the function was executed.
    let isExecuted = false;

    function infiniteScroll() {
      // Inside the "if" statement the "isExecuted" variable is negated to allow initial code execution.
      if (
        window.scrollY > document.body.offsetHeight - window.outerHeight &&
        !isExecuted
      ) {
        // Set "isExecuted" to "true" to prevent further execution
        isExecuted = true;
        if (page === maxPage) {
          setLoading(false);
        } else {
          setLoading(true);
          setTimeout(() => {
            setPage(page + 1);
          }, 1200);
        }

        // After 1 second the "isExecuted" will be set to "false" to allow the code inside the "if" statement to be executed again
      }
    }
    // loadImages();
  }, [page]);

  return (
    <div className="popular-container">
      <div className="popular-content bd-container">
        <div className="search">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Enter Movie, Tv Show or People"
            />
            <input type="submit" value="Search" />
          </form>
        </div>

        <div className="movie-card-list">
          {tvShows.length > 0 ? (
            tvShows.map((tv) => <TvCards key={tv.id} data={tv} />)
          ) : (
            <div className="loading-animation">
              <BeatLoader loading color="#e98580" />
            </div>
          )}
        </div>
        <div className="loading">
          {isLoading && <BeatLoader loading color="#e98580" />}
        </div>
      </div>
    </div>
  );
}

export default OnTv;
