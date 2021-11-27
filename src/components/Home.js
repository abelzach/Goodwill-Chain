import React from "react";
import Body from "./Body";
import BuildFlex from "./Build-Flex";
import Cards from "./Cards";
import Footer from "./Footer";
import { BrowserRouter as Router } from "react-router-dom";

const Home = (props) => {
  return (
    <Router>
      <Body/>
      <BuildFlex />
      <Cards orgBalance={props.orgBalance} />
      <Footer />
    </Router>
  );
};

export default Home;