import React from "react";
import Body from "./Body";
import BuildFlex from "./Build-Flex";
import Cards from "./Cards";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

const Home = () => {
  return (
    <Router>
      <Body />
      <BuildFlex />
      <Cards />
      <Footer />
    </Router>
  );
};

export default Home;