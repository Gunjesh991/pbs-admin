import React from "react";

import LandingBG from "../../assets/wedding2/meeting_hands.jpg";
import arrowSvg from "../../assets/icons/arrow.svg";

import "./landing-banner.css";

const LandingBanner = () => {
  return (
    <div
      className="home__landing"
      style={{
        backgroundImage: `url(${LandingBG})`,
      }}
    >
      <div className="hint">
        <img src={arrowSvg} alt="arrow" />
        <span>Scroll Up</span>
      </div>
    </div>
  );
};

export default LandingBanner;
