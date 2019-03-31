import React, { Component } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/Landing Page/LandingPage";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LandingPage />
      </div>
    );
  }
}

export default App;
