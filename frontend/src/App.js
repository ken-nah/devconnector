import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Home/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import PasswordReset from "./components/auth/PasswordReset/LostPassword";

class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
