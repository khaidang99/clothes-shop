import React from "react";
import { Link } from "react-router-dom";

import "./Home.style.scss";

function Home() {
  return (
    <div id="home-page">
      <div className="wrapper-banner">
        <img
          src="https://static.wixstatic.com/media/84770f_b5b78cd83b6342199b7370a2ba6b9e06.jpg/v1/fill/w_1903,h_601,al_c,q_85,usm_0.66_1.00_0.01/84770f_b5b78cd83b6342199b7370a2ba6b9e06.webp"
          alt=""
        />
        <div className="group-show-now">
          <div className="name-category">FALL & WINTER</div>
          <div className="show-now">
            <Link to={"/products"}>Shop Now</Link>
          </div>
        </div>
      </div>
      <div className="free-ship">FREE SHIPPING WORLWIDE</div>
      <div className="group-year-groud">
        <div className="year-ground">YEAR ROUND</div>
        <div className="line"></div>
        <div className="must-items">Must Have Items</div>
      </div>
      <div className="gourp-items">
        <div className="item">
          <img
            src="https://static.wixstatic.com/media/cda177_f95b14c95d6446de847782f0b6fd0027.png/v1/fill/w_299,h_353,al_c,q_90,usm_0.66_1.00_0.01/cda177_f95b14c95d6446de847782f0b6fd0027.webp"
            alt=""
          />
        </div>
        <div className="item">
          <img
            src="https://static.wixstatic.com/media/cda177_b5a795ade21b41d38cadd836824e6768.jpg/v1/fill/w_299,h_409,al_c,q_80,usm_0.66_1.00_0.01/cda177_b5a795ade21b41d38cadd836824e6768.webp"
            alt=""
          />
        </div>
        <div className="item">
          <img
            src="https://static.wixstatic.com/media/84770f_9a81715dcb4b43fa936d243fcd90e2a9.png/v1/fill/w_299,h_353,al_c,q_90,usm_0.66_1.00_0.01/84770f_9a81715dcb4b43fa936d243fcd90e2a9.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
