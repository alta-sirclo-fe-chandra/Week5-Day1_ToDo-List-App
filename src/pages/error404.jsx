import error404 from "../assets/images/error404.svg";

const Error404 = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <img src={error404} alt="logo" height="200" />
    </div>
  );
};

export default Error404;
