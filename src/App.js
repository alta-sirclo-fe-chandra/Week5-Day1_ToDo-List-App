import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const App = (props) => {
  const [data, setData] = useState("");

  const requestSearch = (data) => {
    setData(data);
  };

  useEffect(() => {
    props.requestSearch(data);
  }, [data, props]);

  return (
    <div>
      <Navbar requestSearch={requestSearch} />
      <Outlet />
    </div>
  );
};

export default App;
