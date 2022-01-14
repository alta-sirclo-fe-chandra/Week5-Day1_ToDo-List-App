import axios from "axios";
import moment from "moment";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Todo from "../../components/todo";
import Form from "../../components/form";

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [inputTask, setInputTask] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState({});
  const searchValue = useSelector((state) => state.search);
  const navigate = useNavigate();

  useEffect(() => {
    searchValue !== "" ? requestSearch(searchValue) : fetchData();
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

  const handleSubmit = async (e) => {
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

  const handleDelete = async (item) => {
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

  const handleComplete = async (item) => {
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

  const handleEdit = async (e) => {
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

  const handleDetail = (item) => {
    navigate(`/todo/${item.id}`);
  };

  const requestSearch = async (searchValue) => {
    setIsReady(false);
    await axios
      .get("/tasks")
      .then((res) => {
        const { data } = res;
        const searchRegex = new RegExp(searchValue, "i");
        const filterRows = data.filter(function (el) {
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
          todo.map((item) => (
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
            />
          ))
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
        <div className="d-flex ms-4 align-items-center py-2">
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
            <BsPlusCircle /> <span className="fs-6 ms-3">Add Task</span>
          </a>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body border-0">
            <Form
              inputTask={inputTask}
              inputDesc={inputDesc}
              onChangeTask={(e) => setInputTask(e.target.value)}
              onChangeDesc={(e) => setInputDesc(e.target.value)}
              onSubmit={(e) => (editMode ? handleEdit(e) : handleSubmit(e))}
              href={"#collapseExample"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
