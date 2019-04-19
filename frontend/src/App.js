import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./App.css";

import { setCurrentUser } from "./actions/auth-actions";
import setAuthToken from "./utils/set-Auth-Token";
import store from "./store";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Home/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import PasswordReset from "./components/auth/PasswordReset/LostPassword";

//check for a valid token in the local storage and send it in the headers of every request if there is one

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decodedToken = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decodedToken));
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/register"
          exact
          component={Register}
        />
        <Route
          path="/password-reset"
          exact
          component={PasswordReset}
        />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
