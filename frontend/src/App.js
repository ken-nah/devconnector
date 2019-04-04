import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Home/Homepage/Homepage";
import Footer from "./components/Footer/Footer";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />

        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Footer />
      </Router>
    );
  }
}

export default App;
