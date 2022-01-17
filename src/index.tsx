import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Routes from "./routes";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import "./assets/styles/index.css";
import "./assets/styles/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// initialize axios
axios.defaults.baseURL = "https://api.todoist.com/rest/v1";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer 181227c00c9ef3f8595658dddfd94cfe2b4c4c5e`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
