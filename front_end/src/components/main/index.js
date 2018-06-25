import React, { Component } from "react";

import Header from "../header"
import NavBar from "../navbar"
import Actions from "../actions"
import Timesheets from "../../containers/timesheets"
import Footer from "../footer"

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Header />
        <Actions />
        <Timesheets />
        <Footer />
      </div>
    );
  }
}

export default Main;
