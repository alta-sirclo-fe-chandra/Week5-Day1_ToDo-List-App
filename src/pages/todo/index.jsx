import axios from "axios";
import React, { Component } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Moment from "react-moment";
import Todo from "../../components/todo";
import Form from "../../components/form";
import { withRouter } from "../../utils/navigation";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      inputTask: "",
      inputDesc: "",
      todo: [],
      editMode: false,
      selected: {},
      currentDateTime: Date().toLocaleString(),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(props) {
    props.data !== "" ? this.requestSearch(props.data) : this.fetchData();
  }

  async fetchData() {
    this.setState({ isReady: false });
    axios
      .get("/tasks")
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.setState({ isReady: true }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isReady: false });
    const body = {
      content: this.state.inputTask,
      description: this.state.inputDesc,
    };
    axios
      .post("/tasks", body)
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async handleDelete(item) {
    this.setState({ isReady: false });
    axios
      .delete(`/tasks/${item.id}`)
      .then((res) => {
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
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async handleEdit(e) {
    e.preventDefault();
    this.setState({ isReady: false });
    const body = {
      content: this.state.inputTask,
      description: this.state.inputDesc,
    };
    axios
      .post(`/tasks/${this.state.selected.id}`, body)
      .then((res) => {
        const { data } = res;
        this.setState({ todo: data });
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDetail(item) {
    this.props.navigate(`/todo/${item.id}`);
  }

  requestSearch(searchValue) {
    const searchRegex = new RegExp(searchValue, "i");
    const filterRows = this.state.todo.filter(function (el) {
      return searchRegex.test(el.content);
    });
    this.setState({ todo: filterRows });
    console.log(this.state.todo);
  }

  render() {
    return (
      <div id="index">
        <div className="container p-lg-4 py-4 mb-5">
          <h1 className="fs-4 fw-bolder">Today</h1>
          <p className="my-3 text-muted">
            <Moment format="LL" element="small">
              {this.state.currentDateTime}
            </Moment>
          </p>
          {this.state.isReady ? (
            this.state.todo.map((item) => {
              return (
                <Todo
                  key={item.id}
                  task={item.content}
                  onClickDelete={() => this.handleDelete(item)}
                  onClickComplete={() => this.handleComplete(item)}
                  onClickEdit={() =>
                    this.setState({
                      inputTask: item.content,
                      inputDesc: item.description,
                      editMode: true,
                      selected: item,
                    })
                  }
                  onClickDetail={() => this.handleDetail(item)}
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
          <div className="d-flex ms-4 align-items-center py-2">
            <a
              className="text-decoration-none text-dark fs-5"
              onClick={() =>
                this.setState({ inputTask: "", editMode: false, inputDesc: "" })
              }
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
              <Form
                inputTask={this.state.inputTask}
                inputDesc={this.state.inputDesc}
                onChangeTask={(e) =>
                  this.setState({ inputTask: e.target.value })
                }
                onChangeDesc={(e) =>
                  this.setState({ inputDesc: e.target.value })
                }
                onSubmit={(e) =>
                  this.state.editMode
                    ? this.handleEdit(e)
                    : this.handleSubmit(e)
                }
                href={"#collapseExample"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(index);
