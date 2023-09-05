import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBlog,
  faPlusSquare,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Navbar({ loginData, logOut, darkMode }) {
 

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Blog Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {loginData ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  <FontAwesomeIcon className="mr-5" icon={faHome} />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  <FontAwesomeIcon icon={faBlog} />
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addBlog">
                  <FontAwesomeIcon icon={faPlusSquare} />
                  Add Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faUser} />
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
