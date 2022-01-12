import React, { Component } from "react";
import Error404 from "../assets/images/error404.svg";

class error404 extends Component {
  render() {
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <img src={Error404} alt="logo" height="200" />
      </div>
    );
  }
}

export default error404;
