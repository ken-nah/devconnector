import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="/img/logo.png" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-navbar"
            aria-controls="main-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="main-navbar"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  data-scroll-nav="1"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/developers"
                  className="nav-link"
                  href="#"
                  data-scroll-nav="2"
                >
                  Developers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  data-scroll-nav="3"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item log-in">
                <Link
                  to="/register"
                  className="nav-link flex-center bg-blue radius-5px transition-3"
                >
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
