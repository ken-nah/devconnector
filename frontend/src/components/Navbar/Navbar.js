import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="../../img/logo.png" alt="logo" />
          </a>
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
                <a
                  className="nav-link"
                  href="#"
                  data-scroll-nav="1"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  data-scroll-nav="2"
                >
                  Developers
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  data-scroll-nav="3"
                >
                  Login
                </a>
              </li>
              <li className="nav-item log-in">
                <a
                  className="nav-link flex-center bg-blue radius-5px transition-3"
                  href="login-page.html"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
