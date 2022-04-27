import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/hooks";
import axios from "axios";

export default function Tasks() {
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  let taskList = tasks.map((task) => {
    return (
      <div className="child-widget-subcontainer">
        <input type="checkbox" />
        <div>{task.task_id}</div>
        <div>{task.task_item}</div>
        <div>Due Date: {task.task_due}</div>
      </div>
    );
  });

  return (
    <div className="org-widget-container">
      {/* <h1>Tasks</h1> */}

      <div className="child-widget-container">
        {tasks ? taskList : "No Tasks"}
        {/* <div className="child-widget-subcontainer">
          <input type="checkbox"></input>
          {tasks ? taskList : "No Tasks"}
        </div> */}
      </div>
    </div>
  );
}
