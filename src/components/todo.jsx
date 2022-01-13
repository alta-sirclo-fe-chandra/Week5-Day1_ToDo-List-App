import { FiEdit } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoTrashOutline } from "react-icons/io5";

const todo = (props) => {
  return (
    <div className="row justify-content-end align-items-center py-2 border-bottom">
      <div className="col-md-10">
        <div className="d-flex align-items-center ms-4 my-2">
          <IoCheckmarkCircleOutline
            className="fs-4"
            data-bs-toggle="tooltip"
            title="Complete Task"
            onClick={props.onClickComplete}
            style={{ cursor: "pointer" }}
          />
          <p
            className="m-0 ms-3 fs-6"
            onClick={props.onClickDetail}
            style={{ cursor: "pointer" }}
          >
            {props.task}
          </p>
        </div>
      </div>
      <div className="col-2 col-md-1 text-end">
        <button
          className="btn"
          data-bs-toggle="collapse"
          href="#collapseExample"
          data-bs-toogle="tooltip"
          title="Edit Task"
          onClick={props.onClickEdit}
        >
          <FiEdit />
        </button>
      </div>
      <div className="col-2 col-md-1">
        <button
          className="btn fs-5"
          data-bs-toggle="tooltip"
          title="Delete Task"
          onClick={props.onClickDelete}
        >
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default todo;
