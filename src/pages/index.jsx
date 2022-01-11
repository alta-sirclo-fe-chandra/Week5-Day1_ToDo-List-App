import axios from "axios";
import React, { Component } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Todo from "../components/todo";

export default class index extends Component {
  state = {
    isReady: false,
    inputTask: "",
    todo: [],
    editMode: false,
    selected: {},
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ isReady: false });
    axios
      .get("/tasks")
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.setState({ isReady: true }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isReady: false });
    axios
      .post("/tasks", { content: this.state.inputTask })
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location = "/";
        this.setState({ isReady: true });
      });
  }

  async handleDelete(item) {
    this.setState({ isReady: false });
    axios
      .delete(`/tasks/${item.id}`)
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async handleComplete(item) {
    this.setState({ isReady: false });
    axios
      .post(`/tasks/${item.id}/close`)
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location = "/";
        this.setState({ isReady: true });
      });
  }

  async handleEdit(e) {
    e.preventDefault();
    this.setState({ isReady: false });
    axios
      .post(`/tasks/${this.state.selected.id}`, {
        content: this.state.inputTask,
      })
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location = "/";
        this.setState({ isReady: true });
      });
  }

  render() {
    return (
      <div id="index">
        <div className="container p-lg-4 pb-5 mb-5">
          <h1 className="fs-4 fw-bolder">Today</h1>
          <p className="my-3 text-muted">
            <small>Monday, Januari 10, 2022</small>
          </p>
          {this.state.isReady ? (
            this.state.todo.map((item) => {
              return (
                <Todo
                  key={item.id}
                  task={item.content}
                  isFinish={item.completed}
                  onClickDelete={() => this.handleDelete(item)}
                  onClickComplete={() => this.handleComplete(item)}
                  onClickEdit={() =>
                    this.setState({
                      inputTask: item.content,
                      editMode: true,
                      selected: item,
                    })
                  }
                />
              );
            })
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <div className="d-flex ms-3 align-items-center py-2">
            <a
              className="btn fs-5"
              onClick={() => this.setState({ inputTask: "", editMode: false })}
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <BsPlusCircle /> <span className="fs-6 ms-3">Add Task</span>
            </a>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="card card-body border-0">
              <form
                onSubmit={(e) =>
                  this.state.editMode
                    ? this.handleEdit(e)
                    : this.handleSubmit(e)
                }
                className="row g-3"
              >
                <div className="col-md-10">
                  <textarea
                    value={this.state.inputTask}
                    onChange={(e) =>
                      this.setState({ inputTask: e.target.value })
                    }
                    className="form-control"
                    type="text"
                    placeholder="enter your task"
                    rows={3}
                  />
                </div>
                <div className="col-md-2 d-grid gap-2">
                  <button
                    type="submit"
                    disabled={!this.state.inputTask.length}
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-light border"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
