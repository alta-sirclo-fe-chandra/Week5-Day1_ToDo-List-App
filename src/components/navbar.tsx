import { FormEvent, useState } from "react";
import { Image } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reduxAction } from "../utils/action";

const Navbar = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(reduxAction("search", data));
    navigate(`/`);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          <Image
            src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
            className="App-logo me-3"
            alt="logo"
            height="60"
          />
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
            <button className="btn" type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
