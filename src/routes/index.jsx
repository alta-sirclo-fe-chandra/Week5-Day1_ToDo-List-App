import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Todo from "../pages/todo";
import TodoId from "../pages/todo/_id";
import Error404 from "../pages/error404";
import { useState } from "react";

const Index = () => {
  const [data, setData] = useState("");

  const requestSearch = (data) => {
    setData(data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="todo" element={<App requestSearch={requestSearch} />}>
          <Route index element={<Todo searchValue={data} />} />
          <Route path=":id" element={<TodoId />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
