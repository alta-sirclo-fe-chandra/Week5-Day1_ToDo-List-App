import { MouseEventHandler } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  IoCheckmarkCircleOutline,
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";

type Props = {
  task: string;
  href: string;
  onClickComplete: MouseEventHandler<HTMLElement>;
  onClickDetail: MouseEventHandler<HTMLElement>;
  onClickEdit: MouseEventHandler<HTMLElement>;
  onClickDelete: MouseEventHandler<HTMLElement>;
};

const Todo = (props: Props) => {
  return (
    <div className="row justify-content-end align-items-center py-3 border-bottom">
      <div className="col-md-10 ps-md-5 d-flex">
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-complete">Complete</Tooltip>}
        >
          <p
            className="mb-0"
            onClick={props.onClickComplete}
            style={{ cursor: "pointer" }}
          >
            <IoCheckmarkCircleOutline className="fs-4" />
          </p>
        </OverlayTrigger>
        <p
          className="m-0 ms-3 fs-6 align-baseline"
          onClick={props.onClickDetail}
          style={{ cursor: "pointer" }}
        >
          {props.task}
        </p>
      </div>
      <div className="col-2 col-md-1 text-end">
        <OverlayTrigger overlay={<Tooltip id="tooltip-edit">Edit</Tooltip>}>
          <a
            className="text-dark fs-5"
            data-bs-toggle="collapse"
            href={props.href}
            onClick={props.onClickEdit}
          >
            <IoCreateOutline />
          </a>
        </OverlayTrigger>
      </div>
      <div className="col-2 col-md-1 text-start text-md-center">
        <OverlayTrigger overlay={<Tooltip id="tooltip-delete">Delete</Tooltip>}>
          <p className="m-0 fs-5" onClick={props.onClickDelete}>
            <IoTrashOutline />
          </p>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default Todo;
