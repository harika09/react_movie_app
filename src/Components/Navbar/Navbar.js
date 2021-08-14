import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const showMenu = () => {
    setClick(!click);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content bd-container">
        <div className="nav-menu-list">
          <ul className="nav-menu">
            <li className={click ? "movie active" : "movie"}>
              <Link to="/">Movie</Link>
            </li>

            <li>
              <Link to="/popular-tv-show">Tv Shows</Link>
            </li>

            <li>
              <Link to="/people">People</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
