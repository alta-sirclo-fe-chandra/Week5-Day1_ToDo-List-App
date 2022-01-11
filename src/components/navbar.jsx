import logo from "../assets/images/logo.svg";

export default function navbar() {
  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand fs-3 fw-bold" href="/">
          <img className="App-logo" src={logo} alt="logo" height="60" />
          Todo List App
        </a>
      </div>
    </nav>
  );
}
