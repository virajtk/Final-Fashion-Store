import React, { Component } from "react";
import { Fade } from "react-slideshow-image";

const fadeImages = [
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    // console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  },
};

class DashHome extends Component {
  render() {
    return (
      <div>
        <br />
        <center>
          <h1>DIVISMA FASHIONS</h1>
        </center>
        <br />

        {/* Slide Show */}
        <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[0]} />
              </div>
              {/* <h2>First Slide</h2> */}
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[1]} />
              </div>
              {/* <h2>Second Slide</h2> */}
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[2]} />
              </div>
              {/* <h2>Third Slide</h2> */}
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[3]} />
              </div>
              {/* <h2>fouth Slide</h2> */}
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default DashHome;
