import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import PeopleCard from "../PeopleCard/PeopleCard";
import "./People.css";

function People() {
  let PAGE_NUMBER = 1;
  let [page, setPage] = useState(PAGE_NUMBER);
  const [maxPage, setMaxPage] = useState("");
  const [people, setPeople] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const onSubmit = (e) => {
    setPeople("");
    e.preventDefault();
    searchPeople();
  };

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

  const searchPeople = async () => {
    if (!search.trim()) {
      errorEmptyMessage();
      setSearch("");
      return loadPeople();
    }
    const query = await Axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
    );
    // setMovie((prev) => [...prev, ...searchMovie.data.results]);
    console.log(query);
    setPeople((prev) => [...prev, ...query.data.results]);
    setMaxPage(query.data.total_pages);
    if (query.data.total_results === 0) {
      setSearch("");
      errorMessage();
      return loadPeople;
    }
    setLoading(false);
  };

  const loadPeople = async () => {
    const people = await Axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );

    setPeople((prev) => [...prev, ...people.data.results]);
    setMaxPage(people.data.total_pages);
  };

  useEffect(() => {
    window.onscroll = infiniteScroll;
    if (!search.trim()) {
      loadPeople();
      setLoading(false);
    } else {
      searchPeople();
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
    <div className="people-container">
      <div className="people-content bd-container">
        <div className="search">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Enter Tv Show"
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div className="movie-card-list">
          {people.length > 0 ? (
            people.map((people) => <PeopleCard key={people.id} data={people} />)
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

export default People;
