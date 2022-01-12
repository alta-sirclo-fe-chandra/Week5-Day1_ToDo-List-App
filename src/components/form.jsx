import React, { Component } from "react";

class form extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="row g-4">
        <div className="col-md-10 d-grid gap-2">
          <textarea
            value={this.props.inputTask}
            onChange={this.props.onChangeTask}
            className="form-control"
            type="text"
            placeholder="enter your task"
            rows={2}
          />
          <textarea
            value={this.props.inputDesc}
            onChange={this.props.onChangeDesc}
            className="form-control"
            type="text"
            placeholder="enter your description"
            rows={3}
          />
        </div>
        <div className="col-md-2">
          <div className="row justify-content-between gap-2">
            <button
              type="submit"
              disabled={!this.props.inputTask.length}
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href={this.props.href}
            >
              Submit
            </button>
            <button
              className="btn btn-light border"
              data-bs-toggle="collapse"
              href={this.props.href}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default form;
