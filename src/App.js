import { useState } from "react";
import Navbar from "./components/navbar";
import Index from "./pages/todo";

function App() {
  const [data, setData] = useState("");

  const requestSearch = (data) => {
    setData(data);
  };

  return (
    <div>
      <Navbar requestSearch={requestSearch} />
      <Index data={data} />
    </div>
  );
}

export default App;
