/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BsCircle } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Form from "../../components/form";

const Detail = () => {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState({
    content: "",
    description: "",
    created: "",
  });
  const [inputTask, setInputTask] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsReady(false);
    await axios
      .get(`/tasks/${id}`)
      .then((res) => {
        const { data } = res;
        setData(data);
        setInputTask(data.content);
        setInputDesc(data.description);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const handleEdit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsReady(false);
    const body = {
      content: inputTask,
      description: inputDesc,
    };
    await axios
      .post(`/tasks/${id}`, body)
      .then((res) => {
        const { data } = res;
        setData(data);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container p-lg-4">
        {isReady ? (
          <div>
            <div className="py-2 border-bottom">
              <div className="fs-6 d-flex align-items-center ms-4 my-3">
                <BsCircle />
                <p className="my-0 ms-3 me-2">{data.content}</p>
                <OverlayTrigger overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
                  <p className="mb-1">
                    <FiEdit2
                      data-bs-toggle="collapse"
                      href="#collapseForm"
                      style={{ cursor: "pointer" }}
                    />
                  </p>
                </OverlayTrigger>
              </div>
              <div className="mx-4">
                <p>{data.description}</p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end py-2">
              <small>{moment(data.created).format("MMMM Do YYYY")}</small>
            </div>
          </div>
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
        <div className="collapse" id="collapseForm">
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
              onSubmit={handleEdit}
              bsToogle={"#collapseForm"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
