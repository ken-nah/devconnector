import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import classnames from "classnames";


import Spinner from "../../common/Spinner/Loading";

import { registerUser } from "../../../actions/auth-actions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {}
  };

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: {}
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword
    } = this.state;

    const newUser = {
      name,
      email,
      password,
      confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated)
      this.props.history.push("/dashboard");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.errors) {
      this.setState({ errors: nextProps.auth.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.auth;

    return (
      <section className="welcome-page register-page sec-padding pb-150px p-relative o-hidden bg-gray h-auto">
        <div className="container">
          <div className="row welcome-text sec-padding flex-center">
            <div className="col-md-6 mb-50px">
              <img
                alt="img"
                src="img/yu.png"
                className="ml-auto mr-auto"
              />
            </div>
            <div className="col-md-6">
              <h1>Sign Up</h1>
              <h6 className="mt-20px mb-10px color-666">
                Create an account with KUCSA
              </h6>
              {errors.msg ? (
                <div
                  className="alert alert-danger"
                >
                  {errors.msg}
                </div>
              ) : (
                ""
              )}
              <form
                id="log-in"
                className="mt-30px"
                onSubmit={this.onSubmitHandler}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group p-relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        className={classnames(
                          "d-block w-100 form-control",
                          {
                            "is-invalid": errors.name
                          }
                        )}
                      />
                      {errors.name && (
                        <i className="invalid-feedback">
                          {errors.name}
                        </i>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group p-relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        className={classnames(
                          "d-block w-100 form-control",
                          {
                            "is-invalid": errors.email
                          }
                        )}
                      />
                      <i className="invalid-feedback">
                        {errors.email}
                      </i>
                    </div>
                  </div>
                </div>
                <div className="form-group p-relative">
                  <input
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                    className={classnames(
                      "d-inline-block w-100 form-control",
                      {
                        "is-invalid": errors.password
                      }
                    )}
                  />

                  <i className="invalid-feedback">
                    {errors.password}
                  </i>
                </div>
                <div className="form-group p-relative">
                  <input
                    type="password"
                    placeholder="Repeat Your Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChangeHandler}
                    className={classnames(
                      "d-inline-block w-100 form-control",
                      {
                        "is-invalid": errors.confirmPassword
                      }
                    )}
                  />
                  <i className="invalid-feedback">
                    {errors.confirmPassword}
                  </i>
                </div>
                <button className="main-btn btn-3 before-gray">
                  Sign Up{" "}
                </button>
                {loading ? <Spinner /> : null}
              </form>
              <Link
                to="/login"
                className="d-inline-block mt-20px"
              >
                Already registered? log in
              </Link>
            </div>
          </div>
        </div>
        <div className="pattern p-absolute" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
