import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { logOutUser } from "../../actions/auth-actions";

import "./Navbar.css";

class Navbar extends Component {
  logoutClickHandler = event => {
    event.preventDefault();

    this.props.logOutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <React.Fragment>
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
      </React.Fragment>
    );

    const authLinks = (
      <a
        href="/"
        className="nav-link mt-30px"
        onClick={this.logoutClickHandler}
      >
        <img
          className="rounded-circle"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "15px"
          }}
          src={user.avatar}
          alt={user.name}
          title="You must have a gravatar connected to your email inorder to display image"
        />
        Logout
      </a>
    );

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
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUser }
)(Navbar);
