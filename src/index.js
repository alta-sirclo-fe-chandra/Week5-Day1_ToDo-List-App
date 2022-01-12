import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./assets/styles/index.css";
import "./assets/styles/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";

// initialize axios
axios.defaults.baseURL = "https://api.todoist.com/rest/v1";
axios.defaults.headers = {
  Authorization: `Bearer 7406a0a5ca1dec58f84f137f67d237715bcc86af`,
};

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
