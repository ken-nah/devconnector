import React, { Component } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

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
                <NavLink
                  to="/"
                  exact
                  activeClassName="active"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="mr-200px nav-item">
                <NavLink
                  to="/developers"
                  activeClassName="active"
                  className="nav-link"
                >
                  Developers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  activeClassName="active"
                  className="nav-link"
                >
                  Login
                </NavLink>
              </li>
              <span className="nav-item">OR</span>
              <li className="nav-item log-in">
                <NavLink
                  to="/register"
                  activeClassName="active"
                  className="nav-link flex-center bg-blue radius-5px transition-3"
                >
                  Join Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
