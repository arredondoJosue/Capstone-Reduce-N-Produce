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
  console.log(typeof x);

  return (
    <div className="child-widget-subcontainer task-design" key={i}>
      <Formik
        initialValues={{
          taskDescription: taskDescription,
          taskDue: x,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));

            axios
              .put(
                `http://localhost:5000/api/v1/tasks/update/${taskId}`,
                values
              )
              .then((res) => {
                console.log(res.data);
                setTaskInput("");
                setTaskDueInput("");
                setTaskDescriptionInput("");
                setSubmitting(false);
                setEditTask(false);
                handleTaskEdit(taskId);
              })
              // .then(() => {
              //     axios
              //         .get(`http://localhost:5000/api/v1/tasks/${user.user_id}`)
              //         .then((res) => {
              //             dispatch(setTasks(res.data));
              //             console.log("hit the tasks get route");
              //         })
              // })
              .catch((err) => {
                console.log(err);
              });
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="edit-task-form">
            <div className="task-design-checkbox edit-task-form-checkbox">
              <Field
                className="task-checkbox"
                type="checkbox"
                onChange={() => {
                  console.log("hit edit task");
                }}
              />
            </div>

            <div className="task-design-content-edit">
              <div className="task-design-description-edit">
                <div className="task-id">{taskId}</div>
                <div className="task-design-description-text-edit">
                  <Field
                    className="task-edit-input"
                    type="text"
                    name="taskDescription"
                    // value={taskDescriptionInput}
                    // defaultValue={taskDescription}
                    // placeholder={taskDescription}
                    // onChange={(e) => {
                    //   setTaskDescriptionInput(e.target.value);
                    // }}
                  />
                </div>
              </div>

              <div className="task-design-due-edit">
                <Field
                  className="task-edit-due-input"
                  type="date"
                  name="dueDate"
                  // value={taskDueInput}
                  // defaultValue={taskDue}
                  // placeholder={taskDue}
                  // onChange={(e) => {
                  //   setTaskDueInput(e.target.value);
                  // }}
                />
              </div>
            </div>

            <div className="task-design-edit-button">
              <button
                className="task-edit-button"
                type="submit"
                disabled={isSubmitting}
                //   onClick={() => {
                //     setEditTask(false);
                //   }}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
