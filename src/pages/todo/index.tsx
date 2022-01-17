import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/reducer";
import { IoAddCircleOutline } from "react-icons/io5";
import { Image } from "react-bootstrap";
import Todo from "../../components/todo";
import Form from "../../components/form";

type item = {
  id: number;
  content: string;
  description: string;
};

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [inputTask, setInputTask] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState({ id: 0 });
  const searchValue = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();

  useEffect(() => {
    searchValue !== "" ? requestSearch(searchValue) : fetchData();
    console.log(searchValue);
  }, [searchValue]);

  const fetchData = async () => {
    setIsReady(false);
    await axios
      .get("/tasks")
      .then((res) => {
        const { data } = res;
        setTodo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsReady(false);
    const body = {
      content: inputTask,
      description: inputDesc,
    };
    await axios
      .post("/tasks", body)
      .then((res) => {
        const { data } = res;
        setTodo(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (item: item) => {
    setIsReady(false);
    await axios
      .delete(`/tasks/${item.id}`)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = async (item: item) => {
    setIsReady(false);
    await axios
      .post(`/tasks/${item.id}/close`)
      .then((res) => {
        const { data } = res;
        setTodo(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsReady(false);
    const body = {
      content: inputTask,
      description: inputDesc,
    };
    await axios
      .post(`/tasks/${selected.id}`, body)
      .then((res) => {
        const { data } = res;
        setTodo(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetail = (item: item) => {
    navigate(`/todo/${item.id}`);
  };

  const requestSearch = async (searchValue: string) => {
    setIsReady(false);
    await axios
      .get("/tasks")
      .then((res) => {
        const { data } = res;
        const searchRegex = new RegExp(searchValue, "i");
        const filterRows = data.filter(function (el: any) {
          return searchRegex.test(el.content);
        });
        setTodo(filterRows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  return (
    <div id="index">
      <div className="container p-lg-4 py-4 mb-5">
        <h1 className="fs-4 fw-bolder">Today</h1>
        <div className="mb-3">
          <small className="text-muted">
            {moment().format("MMMM Do YYYY")}
          </small>
        </div>
        {isReady ? (
          todo.length ? (
            todo.map((item: item) => (
              <Todo
                key={item.id}
                task={item.content}
                onClickDelete={() => handleDelete(item)}
                onClickComplete={() => handleComplete(item)}
                onClickEdit={() => {
                  setInputTask(item.content);
                  setInputDesc(item.description);
                  setEditMode(true);
                  setSelected(item);
                }}
                onClickDetail={() => handleDetail(item)}
                href={"#collapseExample"}
              />
            ))
          ) : (
            <div className="text-center">
              <Image
                src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                className="App-logo"
                alt="logo"
                height="100"
              />
              <p>Sorry, no result found</p>
            </div>
          )
        ) : (
          <div className="w-100 d-flex justify-content-center">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div className="row py-3">
          <div className="col-12 ps-md-5">
            <a
              className="text-decoration-none text-dark fs-5"
              onClick={() => {
                setInputTask("");
                setEditMode(false);
                setInputDesc("");
              }}
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <IoAddCircleOutline className="fs-4" />
              <span className="fs-6 ms-3">Add Task</span>
            </a>
          </div>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body border-0">
            <Form
              inputTask={inputTask}
              inputDesc={inputDesc}
              onChangeTask={(e: ChangeEvent<HTMLInputElement>) =>
                setInputTask(e.target.value)
              }
              onChangeDesc={(e: ChangeEvent<HTMLInputElement>) =>
                setInputDesc(e.target.value)
              }
              onSubmit={editMode ? handleEdit : handleSubmit}
              bsToogle={"#collapseExample"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
