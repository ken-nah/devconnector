import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import "../Auth.css";
import "../../../App.css";

import { loginUser } from "../../../actions/auth-actions";

class Login extends Component {
  state = {
    email: "",
    password: "",
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <section className="welcome-page sec-padding pb-150px p-relative o-hidden bg-gray h-auto">
        <div className="container">
          <div className="row welcome-text sec-padding flex-center">
            <div className="col-md-6 mb-50px">
              <img
                alt="img"
                src="img/kl.png"
                className="ml-auto mr-auto"
              />
            </div>
            <div className="col-md-6">
              <h1>Log in</h1>
              <p className="mb-50px">
                Are you a member of KUCSA? Login to your
                account now
              </p>
              <form
                id="log-in"
                className="mt-30px mb-20px"
                onSubmit={this.onSubmitHandler}
              >
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
                <div className="form-group p-relative">
                  <input
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeHandler}
                    className={classnames(
                      "d-block w-100 form-control",
                      {
                        "is-invalid": errors.password
                      }
                    )}
                  />
                  <i className="invalid-feedback">
                    {errors.password}
                  </i>
                </div>
                <button className="main-btn btn-3 before-gray">
                  Log In
                </button>
              </form>
              <Link
                to="/register"
                className="float-left mb-10px"
              >
                Not a member? Sign up
              </Link>
              <Link
                to="/password-reset"
                className="float-right"
              >
                Forgot password
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
