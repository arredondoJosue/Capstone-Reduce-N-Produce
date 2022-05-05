import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TaskList from "./TaskList";

export default function Tasks() {
  let [tasks, setTasks] = useState([]);

  const userInfo = useSelector((state) => state.globalStore.userInfo);

  // Gets all of the current user's tasks
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/tasks/${userInfo.user_id}`)
      .then((res) => {
        setTasks((prev) => [...prev, ...res.data]);
      });
  }, []);

  // Marks a task as complete and updates the database
  function handleChangeChecked(task_id, isComplete) {
    console.log(
      "hit handle fx with task_id: " +
        task_id +
        " and isComplete: " +
        isComplete
    );

    axios
      .put(
        `http://localhost:5000/api/v1/tasks/completed_task/${userInfo.user_id}`,
        {
          isComplete,
          task_id,
        }
      )
      .then((res) => {
        setTasks((prev) => {
          let newState = prev.filter((task) => task.task_id !== task_id);
          return newState;
        });
        console.log(tasks);
      });
  }

  function handleTaskEdit(task_id) {
    console.log("hit handleTaskEdit with task_id: " + task_id);
    // setTasks((prev) => {
    //   let newState = prev.filter((task) => task.task_id !== task_id);
    //   return newState;
    // });
  }

  // Maps through the tasks and creates a list of tasks
  let taskList = tasks.map((task, i) => {
    return (
      <TaskList
        key={i}
        taskId={task.task_id}
        taskisComplete={task.task_isComplete}
        taskDescription={task.task_description}
        taskDue={task.task_due}
        handleChangeChecked={handleChangeChecked}
        handleTaskEdit={handleTaskEdit}
      />
    );
  });

  return (
    <div className="org-widget-container">
      <div className="child-widget-container">
        {tasks ? taskList : <h2>No tasks for you to complete!</h2>}
      </div>
    </div>
  );
}
