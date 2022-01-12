import axios from "axios";
import React, { Component } from "react";
import { BsCircle } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Moment from "react-moment";
import Form from "../../components/form";
import Nav from "../../components/nav";
import { readParams } from "../../utils/navigation";

class _id extends Component {
  state = {
    isReady: false,
    data: {},
    inputTask: "",
    inputDesc: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const id = this.props.params.id;
    this.setState({ isReady: false });
    axios
      .get(`/tasks/${id}`)
      .then((res) => {
        const { data } = res;
        this.setState({
          data: data,
          inputTask: data.content,
          inputDesc: data.description,
        });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => this.setState({ isReady: true }));
  }

  async handleEdit(e) {
    e.preventDefault();
    const id = this.props.params.id;
    this.setState({ isReady: false });
    const body = {
      content: this.state.inputTask,
      description: this.state.inputDesc,
    };
    axios
      .post(`/tasks/${id}`, body)
      .then((res) => {
        const { data } = res;
        this.setState({ data });
        this.fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Nav />
        <div className="container p-lg-4">
          {this.state.isReady ? (
            <div>
              <div className="py-2 border-bottom">
                <div className="fs-6 d-flex align-items-center ms-4 my-3">
                  <BsCircle />
                  <p className="my-0 ms-3 me-2">{data.content}</p>
                  <FiEdit2
                    data-bs-toggle="collapse"
                    href="#collapseForm"
                    data-bs-toogle="tooltip"
                    title="Edit Task"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="mx-4">
                  <p>{data.description}</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end py-2">
                <Moment format="LL" element="small">
                  {data.created}
                </Moment>
              </div>
            </div>
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
          <div className="collapse" id="collapseForm">
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
                onSubmit={(e) => this.handleEdit(e)}
                href={"#collapseForm"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default readParams(_id);
