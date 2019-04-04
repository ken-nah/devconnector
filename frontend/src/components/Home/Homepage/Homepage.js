import React, { Component } from 'react'

import LandingPage from "../LandingPage";
import About from "../About";
import HowWork from "../How-work";
import Subscribe from "../Subcribe";

 class Homepage extends Component {
  render() {
    return (
      <div>
        <LandingPage />
        <About />
        <HowWork />
        <Subscribe />
      </div>
    )
  }
}

export default Homepage;
