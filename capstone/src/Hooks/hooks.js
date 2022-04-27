import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, type) => {
  const [data, setData] = useState();
  const [task, setTask] = useState();

  const urlWithProxy = `http://localhost:5000/api/v1/${url}`;
  if (type === "get") {
    useEffect(() => {
      axios
        .get(urlWithProxy)
        .then((res) => {
          url === "tasks" ? setTask(res.data) : setData(res.data);
          //   setData(res.data);
          //   console.log("useAxios data: ", res.data);
          console.log("useAxios task: ", task);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return url === "tasks" ? (task === undefined ? "Broken" : task) : data;
  } else if (type === "post") {
    useEffect(() => {
      axios
        .post(urlWithProxy, response)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [response]);
    return data;
  }
};

export default useAxios;
