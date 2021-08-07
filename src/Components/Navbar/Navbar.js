import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content bd-container">
        <div className="nav-menu-list">
          <ul className="nav-menu">
            <li>
              <Link>Movie</Link>
            </li>

            <li>
              <Link>Tv Shows</Link>
            </li>

            <li>
              <Link>People</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
