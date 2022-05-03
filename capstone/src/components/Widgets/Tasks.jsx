import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";

export default function Tasks() {
  let [tasks, setTasks] = useState([]);
  let [checkbox, setCheckbox] = useState(true);
  let [checkTime, setCheckTime] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/tasks/${1}`).then((res) => {
      setTasks(res.data);
    });
  }, []);

  // function handleChangeChecked(id, isComplete) {
  //   console.log(
  //     "hit handle fx with id: " + id + " and isComplete: " + isComplete
  //   );
  //   isComplete ? null : setCheckbox(isComplete);
  //   isComplete ? null : setCheckTime(new Date(Date.now()));

  //   setTimeout(() => {
  //     console.log(
  //       "hit setTimeout #1, status of isComplete: " +
  //         isComplete +
  //         " and checkbox: " +
  //         checkbox +
  //         " and id: " +
  //         id
  //     );

  //     checkbox
  //       ? setTimeout(() => {
  //           console.log(
  //             "hit setTimeout #1a, axios RAN status of isComplete: " +
  //               isComplete +
  //               " and checkbox: " +
  //               checkbox +
  //               " of TASK id: " +
  //               id
  //           );
  //         }, 1000)
  //       : setTimeout(() => {
  //           console.log(
  //             "hit setTimeout #1b, axios CANCELLED status of isComplete: " +
  //               isComplete +
  //               " and checkbox: " +
  //               checkbox +
  //               " of TASK id: " +
  //               id
  //           );
  //         }, 1000);
  //   }, 5000);
  // }

  function handleChangeChecked(task_id, isComplete) {
    console.log(
      "hit handle fx with task_id: " +
        task_id +
        " and isComplete: " +
        isComplete
    );
    axios
      .put(`http://localhost:5000/api/v1/tasks/completed_task/${1}`, {
        isComplete,
        task_id,
      })
      .then((res) => {
        setTasks((prev) => {
          let newState = prev.filter((task) => task.task_id !== task_id);
          return newState;
        });
      });
  }

  let taskList = tasks.map((task) => {
    return (
      // <div className="child-widget-subcontainer" key={task.task_id}>
      //   <input
      //     type="checkbox"
      //     defaultChecked={taskCheck}
      //     onChange={() => {
      //       // setCheckbox(!checkbox);
      //       setTaskCheck(!taskCheck);
      //       handleChangeChecked(task.task_id, taskCheck);
      //     }}
      //   />
      //   <div>{task.task_id}</div>
      //   <div>{task.task_description}</div>
      //   <div>Due Date: {task.task_due}</div>
      // </div>
      <TaskList
        key={task.task_id}
        // taskId={task.task_id}
        taskisComplete={task.task_isComplete}
        taskDescription={task.task_description}
        taskDue={task.task_due}
        handleChangeChecked={handleChangeChecked}
      />
    );
  });

  return (
    <div className="org-widget-container">
      {/* <h1>Tasks</h1> */}

      <div className="child-widget-container">
        {tasks ? taskList : "No Tasks"}
        {/* <TaskList /> */}
        {/* <div className="child-widget-subcontainer">
          <input type="checkbox"></input>
          {tasks ? taskList : "No Tasks"}
        </div> */}
      </div>
    </div>
  );
}
