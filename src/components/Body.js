import React from "react";
import Banner from "./assets/svg/wave (10).svg";
import pic from '../logo.png';
function Body() {
  return (
    <section id="hero-section">
      <div className="container-fluid-hero">
        <div className="row">
          <div className="col-lg-6 hero-intro">
            <h1>
              "The smallest act of kindness is worth more than the grandest intentions " -Oscar Wilde
              <span>.</span>
            </h1>
            <p>
              Donate for the better good.
            </p>
            <br />
            
            <a href="#go-here">
              <button className="btn btn-lg cta">Learn More</button>
            </a>
            
          </div>
          <img src={pic} width="300" height="300" alt="NFT image"></img>
          <br /><br />
          <div className="col-lg-6 hero-image pt-5 pl-5">
          
          </div>
        </div>
      </div>
      <img className="hero-wave" src={Banner} alt="hero-wave" />
      
    </section>
  );
}

export default Body;
