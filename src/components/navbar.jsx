import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import logo from "../assets/images/logo.svg";

function Navbar(props) {
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.requestSearch(data);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          <img className="App-logo" src={logo} alt="logo" height="60" />
          Todo List App
        </a>
        <button
          className="navbar-toggler btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex gap-2 ms-auto" onSubmit={handleSubmit}>
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setData(e.target.value)}
            />
            <button className="btn">
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
