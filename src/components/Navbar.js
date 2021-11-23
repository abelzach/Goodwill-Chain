import React from "react";
import "./styles.css";

const Navbar = () => {
  
  return (
    <nav id="go-to-top" class="navbar navbar-expand-lg selectDisable">
      <a class="navbar-brand">Goodwill Chain </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item navlink-border">
            <a className="nav-link px-4">
              NFTS
            </a>
          </li>
          <li className="nav-item navlink-border">
            <a className="nav-link px-4">
              Funds
            </a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
