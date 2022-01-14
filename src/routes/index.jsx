import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Todo from "../pages/todo";
import TodoId from "../pages/todo/_id";
import Error404 from "../pages/error404";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="todo" element={<App />}>
          <Route index element={<Todo />} />
          <Route path=":id" element={<TodoId />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
