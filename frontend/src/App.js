import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/HomePage/LandingPage";
import About from "./components/HomePage/About";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LandingPage />
        <About />
      </div>
    );
  }
}

export default App;
