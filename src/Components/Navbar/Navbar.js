import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Images/favicon.ico";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [header, setHeader] = useState(false);

  const showMenu = () => {
    setClick(!click);
  };

  const hideMenu = () => setClick(false);

  const stickyBackground = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  window.addEventListener("scroll", stickyBackground);

  return (
    <div className={header ? "navbar-container active" : "navbar-container"}>
      <div className="navbar-content bd-container">
        <div className="logo">
          <Link to="/" onClick={hideMenu}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-menu-list">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <div class="dropdown">
                <span>Movie</span>
                <div class="dropdown-content">
                  <Link to="/" onClick={hideMenu}>
                    Popular
                  </Link>
                  <Link to="/now-playing" onClick={hideMenu}>
                    Now Playing
                  </Link>
                  <Link to="/upcoming" onClick={hideMenu}>
                    Upcoming
                  </Link>
                  <Link to="/top-rated" onClick={hideMenu}>
                    Top Rated
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <div class="dropdown">
                <span>Tv Shows</span>
                <div class="dropdown-content">
                  <Link to="/popular-tv-show" onClick={hideMenu}>
                    Popular
                  </Link>
                  <Link to="/Airing-tv-show" onClick={hideMenu}>
                    Airing Today
                  </Link>
                  <Link to="/on-tv-show" onClick={hideMenu}>
                    On Tv
                  </Link>
                  <Link to="/top-tv-show" onClick={hideMenu}>
                    Top Rated
                  </Link>
                </div>
              </div>
            </li>

            <li>
              <div class="dropdown">
                <span>People</span>
                <div class="dropdown-content">
                  <Link to="/people" onClick={hideMenu}>
                    Popular
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={click ? "menu-toggle active" : "menu-toggle"}
          onClick={showMenu}
        ></div>
      </div>
    </div>
  );
}

export default Navbar;
