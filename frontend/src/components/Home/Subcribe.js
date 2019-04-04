import React from "react";
import "./Subcribe.css";
import "../../App.css";

const Subcribe = () => {
  return (
    <section className="get-started bg-gray text-center triangle-top triangle-bottom">
      <div className="container">
        <div className="row mb-50px">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 z-index-2">
            <h3 className="mb-10px">Join our mail list</h3>
            <p className="mb-30px">
              Enter your email and get notified about
              important news and updates
            </p>
            <form className="p-relative">
              <input
                type="email"
                required
                className="radius-50px mb-10px pl-15px pt-7px pb-7px no-border w-100"
                placeholder="Enter your email"
              />
              <button className="bg-orange color-fff radius-50px pr-15px pl-15px pt-7px pb-7px no-border p-absolute">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subcribe;
