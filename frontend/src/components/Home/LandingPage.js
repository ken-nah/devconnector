import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import "../../App.css";

const LandingPage = () => {
  return (
    <section
      className="welcome-page sec-padding p-relative o-hidden bg-gray"
      data-scroll-index="1"
    >
      <div className="container">
        <div className="row welcome-text sec-padding flex-center">
          <div className="col-md-6 mb-50px z-index-1">
            <h1 className="mb-20px">KUCSA Developers</h1>
            <p>
              Are you, or was a computing science student in
              Kisii University? Do you have programming
              skills? Join other developers in making the
              soul of devices.Let's network, do project
              collaborations and upgrade our job readiness.
            </p>
            <Link
              className="main-btn btn-3 mt-40px mr-10px before-gray"
              to="/register"
            >
              Join Us
            </Link>
            <Link
              className="main-btn btn-3 btn-orange mt-10px before-gray"
              data-lity
              to="/login"
            >
              Login
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <img alt="img" src="/img/n.png" />
          </div>
        </div>
      </div>
      <div className="pattern p-absolute" />
    </section>
  );
};

export default LandingPage;
