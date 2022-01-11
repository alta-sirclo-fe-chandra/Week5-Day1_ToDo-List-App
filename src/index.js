import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './assets/styles/index.css';
import './assets/styles/loading.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import App from './App';
import reportWebVitals from './reportWebVitals';

// initialize axios
axios.defaults.baseURL = "https://api.todoist.com/rest/v1"
axios.defaults.headers = {
  Authorization: `Bearer ad8fc2129ccfbc64a482d0bd67bf30559a931351`
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
