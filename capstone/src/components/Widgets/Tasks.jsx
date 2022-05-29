import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import TaskList from "./TaskList";

export default function Tasks() {
  let [tasks, setTasks] = useState([]);
  const [taskSort, setTaskSort] = useState("tasks");

  const userInfo = useSelector((state) => state.globalStore.userInfo);
  const userTasks = useSelector((state) => state.globalStore.tasks);

  // Gets all of the current user's tasks
  useEffect(() => {
    if ((tasks = [])) {
      axios
        .get(`http://localhost:5000/api/v1/tasks/${userInfo.user_id}`)
        .then((res) => {
          // setTasks((prev) => [...prev, ...res.data]);
          setTasks(res.data);
        });
    } else {
      setTasks(userTasks);
    }
  }, [userTasks]);

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

  function handleTaskEdit(task_id, values) {
    console.log("hit handleTaskEdit with task_id: " + task_id);
    console.log("hit handleTaskEdit with values: ", values);
    setTasks(values);
    // setTasks((prev) => {
    //   let newState = prev.filter((task) => task.task_id !== task_id);
    //   return newState;
    // });
  }

  // Sorts the tasks by due date
  let sortedTasks = tasks.sort((a, b) => {
    return new Date(a.task_due) - new Date(b.task_due);
  });

  // Sorts the tasks by their id
  let sortedByID = tasks.sort((a, b) => {
    return a.task_id - b.task_id;
  });

  let sortedByPriority = tasks.sort((a, b) => {
    return a.task_priority - b.task_priority;
  });

  let sortedByStatus = tasks.sort((a, b) => {
    return a.task_status - b.task_status;
  });

  let sortedByAssigned = tasks.sort((a, b) => {
    return a.task_assigned_to - b.task_assigned_to;
  });

  // console.log(sortedTasks);
  // console.log(sortedByID);

  // Maps through the tasks and creates a list of tasks
  // let taskList = sortedTasks.map((task, i) => {
  // let taskList = tasks.map((task, i) => {
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
        setTasks={setTasks}
      />
    );
  });

  return (
    <div className="org-widget-container">
      <div className="child-widget-container">
        {
          (tasks = [] ? (
            taskList
          ) : (
            <h2 style={{ color: "grey" }}>No tasks for you to complete!</h2>
          ))
        }
      </div>
    </div>
  );
}
