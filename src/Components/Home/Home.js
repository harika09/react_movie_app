import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BeatLoader } from "react-spinners";
import MovieCard from "../MovieCard/MovieCard";
import "./Home.css";

function Home() {
  let PAGE_NUMBER = 1;
  let [page, setPage] = useState(PAGE_NUMBER);
  const [maxPage, setMaxPage] = useState("");
  const [movies, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadMovies = async () => {
    const movies = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    setTimeout(() => {
      setMovie((prev) => [...prev, ...movies.data.results]);
      setMaxPage(movies.data.total_results);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    loadMovies();

    window.onscroll = infiniteScroll;

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
          }, 1500);
        }

        // After 1 second the "isExecuted" will be set to "false" to allow the code inside the "if" statement to be executed again
      }
    }
    // loadImages();
  }, [page]);
  return (
    <div className="home-container">
      <div className="home-content bd-container">
        <div className="movie-card-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>

        <div className="loading">
          {isLoading && <BeatLoader loading color="#e98580" />}
        </div>
      </div>
    </div>
  );
}

export default Home;
