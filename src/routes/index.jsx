import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import TodoId from "../pages/todo/_id";
import Error404 from "../pages/error404";

class index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/todo" />} />
          <Route path="/todo" element={<App />} />
          <Route path="/todo/:id" element={<TodoId />} />
          <Route path="*" element={<Error404 />} />
          {/* Can't put props in Outlet, so there is no child route*/}
        </Routes>
      </BrowserRouter>
    );
  }
}

export default index;
