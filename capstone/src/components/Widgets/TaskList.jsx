import React, { useState, useEffect } from "react";

export default function TaskList({
  handleChangeChecked,
  taskId,
  taskDescription,
  taskDue,
  taskisComplete,
}) {
  let [taskCheck, setTaskCheck] = useState(true);

  return (
    <>
      <div className="child-widget-subcontainer">
        <input
          className="task-checkbox"
          type="checkbox"
          defaultChecked={taskisComplete}
          onChange={() => {
            setTaskCheck(!taskCheck);
            handleChangeChecked(taskId, taskCheck);
          }}
        />
        <div>{taskId}</div>
        <div>{taskDescription}</div>
        <div>Due Date: {taskDue}</div>
      </div>
    </>
  );
}
