import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks } from "../../Hooks/userSlice";

import axios from "axios";

export default function EditTask({
  taskId,
  taskDescription,
  taskDue,
  setEditTask,
  handleTaskEdit,
  i,
  setTasks,
}) {
  let [taskInput, setTaskInput] = useState("");
  let [taskDueInput, setTaskDueInput] = useState("");
  let [taskDescriptionInput, setTaskDescriptionInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.globalStore.userInfo);

  useEffect(() => {
    setTaskInput(taskDescription);
    setTaskDueInput(taskDue);
    setTaskDescriptionInput(taskDescription);
  }, []);

  let x = new Date(taskDue).toISOString().split("T")[0];

  function handleSubmit(values) {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      axios
        .put(`http://localhost:5000/api/v1/tasks/update/${taskId}`, values)
        .then((res) => {
          console.log(res.data);
          // setTaskInput("");
          // setTaskDueInput("");
          // handleTaskEdit(taskId);
        })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/v1/tasks/${user.user_id}`)
            .then((res) => {
              handleTaskEdit(taskId, res.data);
              console.log("2nd axios get tasks data: ", res.data);
              // dispatch(setTasks(res.data));
              console.log("hit the tasks get route");
              setEditTask(false);
              console.log("hit the tasks get route 2");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }

  return (
    <div className="child-widget-subcontainer task-design" key={i}>
      <div className="task-design-checkbox edit-task-form-checkbox">
        <input
          className="task-checkbox"
          type="checkbox"
          name="taskCompleted"
          onClick={() => {
            handleSubmit({
              taskDescription: taskDescriptionInput,
              dueDate: taskDueInput,
            });
          }}
          // onChange={() => {
          //   //   setEditTask(false);
          //   console.log("clicked checkbox");
          // }}
        />
      </div>

      <div className="task-design-content-edit">
        <div className="task-design-description-edit">
          <div className="task-id">{taskId}</div>
          <div className="task-design-description-text-edit">
            <input
              className="task-edit-input"
              type="text"
              name="taskDescription"
              // value={taskDescriptionInput}
              defaultValue={taskDescription}
              // placeholder={taskDescription}
              onChange={(e) => {
                setTaskDescriptionInput(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="task-design-due-edit">
          <input
            className="task-edit-due-input"
            type="date"
            name="dueDate"
            value={taskDueInput}
            defaultValue={taskDue}
            placeholder={taskDue}
            onChange={(e) => {
              setTaskDueInput(e.target.value);
            }}
          />
        </div>
      </div>

      {/* <div className="task-design-edit-button">
        <button
          className="task-edit-button"
          type="submit"
          onClick={() => {
            handleSubmit({
              taskDescription: taskDescriptionInput,
              dueDate: taskDueInput,
            });
          }}
        >
          Save
        </button>
      </div> */}
    </div>
  );
}
