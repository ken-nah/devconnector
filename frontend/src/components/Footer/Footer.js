import React from "react";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer class="sm-padding text-center">
      <div class="container">
        <h6 class="mb-0px">
          Made with <i className="fa fa-facebook" /> and
          <i className="fa fa-facebook" /> by
          <Link to="github.com/ken-nah"> Kennah. </Link> © 2019 KUCSA
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
