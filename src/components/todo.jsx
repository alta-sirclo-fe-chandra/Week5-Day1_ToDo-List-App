import React, { Component } from "react";
import { FiEdit } from "react-icons/fi";
import { IoCheckmarkCircleOutline, IoTrashOutline } from "react-icons/io5";

export default class todo extends Component {
  render() {
    return (
      <div className="row justify-content-end align-items-center py-2 border-bottom">
        <div className="col-md-10">
          <button
            className="btn fs-4 d-flex ms-3 text-start"
            style={{ cursor: "context-menu" }}
          >
            <IoCheckmarkCircleOutline
              data-bs-toggle="tooltip"
              title="Complete Task"
              onClick={this.props.onClickComplete}
              style={{ cursor: "pointer" }}
            />
            <p className="m-0 ms-3 fs-6">{this.props.task}</p>
          </button>
        </div>
        <div className="col-2 col-md-1 text-end">
          <button
            className="btn"
            data-bs-toggle="collapse"
            href="#collapseExample"
            data-bs-toogle="tooltip"
            title="Edit Task"
            onClick={this.props.onClickEdit}
          >
            <FiEdit />
          </button>
        </div>
        <div className="col-2 col-md-1">
          <button
            className="btn fs-5"
            data-bs-toggle="tooltip"
            title="Delete Task"
            onClick={this.props.onClickDelete}
          >
            <IoTrashOutline />
          </button>
        </div>
      </div>
    );
  }
}
