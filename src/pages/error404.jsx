import Error404 from "../assets/images/error404.svg";

const error404 = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <img src={Error404} alt="logo" height="200" />
    </div>
  );
};

export default error404;
