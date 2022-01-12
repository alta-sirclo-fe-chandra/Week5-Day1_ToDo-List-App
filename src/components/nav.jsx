import React, { Component } from "react";
import logo from "../assets/images/logo.svg";

class nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold" href="/">
            <img className="App-logo" src={logo} alt="logo" height="60" />
            Todo List App
          </a>
        </div>
      </nav>
    );
  }
}

export default nav;
