import React from "react";
import "./How-work.css";

const HowWork = () => {
  return (
    <section className="how-work text-center sec-padding">
      <div className="container">
        <h1 className="title-h">It's easy as pie</h1>
        <p className="title-p">
          Follow this three simple steps and become part of us
        </p>
        <div className="row">
          <div className="col-md-4 p-relative">
            <div className="mt-25px mb-25px pr-30px pl-30px">
              <span className="p-relative d-inline-block bg-gray color-blue radius-50 text-center fs-30 fw-600 mb-15px transition-3">
                01
              </span>
              <h4>Register</h4>
              <p>
                Create an account
              </p>
            </div>
          </div>
          <div className="col-md-4 p-relative">
            <div className="mt-25px mb-25px pr-30px pl-30px">
              <span className="p-relative d-inline-block bg-gray color-blue radius-50 text-center fs-30 fw-600 mb-15px transition-3">
                02
              </span>
              <h4>Login</h4>
              <p>
                Sign in to your account
              </p>
            </div>
          </div>
          <div className="col-md-4 p-relative last-one">
            <div className="mt-25px mb-25px pr-30px pl-30px">
              <span className="p-relative d-inline-block bg-gray color-blue radius-50 text-center fs-30 fw-600 mb-15px transition-3">
                03
              </span>
              <h4>Create Profile</h4>
              <p>
                Build your developer profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWork;
