import React from "react";
import "./About.css";

const About = () => {
  return (
    <section
      className="about-area sec-padding"
      data-scroll-index="2"
    >
      <div className="container">
        <div className="row mb-25px">
          <div className="col-md-6">
            <div
              className="mt-25px mb-25px wow fadeInLeft"
              data-wow-delay="0.45s"
            >
              <img src="img/v.png" alt="img" />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="mt-25px mb-25px wow fadeInRight"
              data-wow-delay="0.7s"
            >
              <span className="fs-20 pt-10px pb-10px pr-25px pl-25px radius-50px bg-gray color-blue">
                About KUCSA
              </span>
              <h3 className="mb-15px mt-20px">
                What we want to achieve
              </h3>
              <p className="mb-15px">
                We want to create an innovative learning
                environment, With a belief that engaging in
                active learning provides significant
                benefits and is critical to the success of
                programmers. This can bring benefits such
                as:
              </p>
              <p className="mb-10px">
                <i className="fa fa-check color-blue mr-5px" />
                Contributing to upgrading the student's job
                readiness
              </p>
              <p className="mb-10px">
                <i className="fa fa-check color-blue mr-5px" />
                Hosting events - competitions, hackathons or
                talks.
              </p>
              <p className="mb-10px">
                <i className="fa fa-check color-blue mr-5px" />
                Networking with future graduates
              </p>
              <p className="mb-10px">
                <i className="fa fa-check color-blue mr-5px" />
                Advertising jobs in the posts section for
                other qualified candidates to apply
              </p>
              <p>
                <i className="fa fa-check color-blue mr-5px" />
                Possible project collaborations
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-25px">
          <div className="col-md-6">
            <div
              className="mt-25px mb-25px wow fadeInLeft"
              data-wow-delay="0.7s"
            >
              <span className="fs-20 pt-10px pb-10px pr-25px pl-25px radius-50px bg-gray color-blue">
                Join Us Now !
              </span>
              <h3 className="mb-15px mt-20px">
                Be part of the Community
              </h3>
              <p className="mb-15px">
                Networking, sharing common interests and
                frustations in the software development
                process can be a lot of fun when done the
                right away.To us, good software developers
                should be open-minded. Ready to change their
                opinion upon discussing with teammates or
                uncovering new information. Everyone
                welcomes and discusses all ideas. Come on
                board and bring what you have as we focus on
                building better softwares
              </p>
              <p className="bg-gray p-15px mb-10px">
                KUCSA aims at growing and having a huge
                supportive community. We want to have
                activities such as live coding
                collaborations, programming contests, pair
                programming, live presentations etc. This
                project is open source and can be found on
                this{" "}
                <a href="https://github.com/ken-nah/KUSCA-Dev-Connector/">
                  GitHub Repo
                </a>
                <br />
                The project is made using <b>MERN</b> stack.
                Feel free to fork the repo, add your own
                ideas and submit pull requests.We'll be
                happy to merge your suggestion and
                acknowledge you as the heritor.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="mt-25px mb-25px wow fadeInRight"
              data-wow-delay="0.45s"
            >
              <img src="img/j.png" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
