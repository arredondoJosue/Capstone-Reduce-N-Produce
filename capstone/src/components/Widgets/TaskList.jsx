import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import EditTaskcopy from "./EditTask copy";

export default function TaskList({
  handleChangeChecked,
  handleTaskEdit,
  taskId,
  taskDescription,
  taskDue,
  taskisComplete,
}) {
  let [taskCheck, setTaskCheck] = useState(true);
  let [editTask, setEditTask] = useState(false);
  let [taskInput, setTaskInput] = useState("");
  let [taskDueInput, setTaskDueInput] = useState("");
  let [taskDescriptionInput, setTaskDescriptionInput] = useState("");

  return (
    <>
      <div className="child-widget-subcontainer task-design">
        <div className="task-design-checkbox">
          <input
            className="task-checkbox"
            type="checkbox"
            defaultChecked={taskisComplete}
            onChange={() => {
              setTaskCheck(!taskCheck);
              handleChangeChecked(taskId, taskCheck);
            }}
          />
        </div>

        <div
          className="task-design-content"
          onClick={() => setEditTask(!editTask)}
        >
          <div className="task-design-description">
            <div className="task-id">{taskId}</div>
            <div className="task-design-description-text">
              {taskDescription}
            </div>
            {/* <div>Due: {taskDue.slice(5, 10)}</div> */}
          </div>

          <div className="task-design-due">
            <div>Due: {taskDue.slice(5, 10)}</div>
          </div>
        </div>
      </div>

      {editTask ? (
        // <EditTask
        //   key={taskId}
        //   taskId={taskId}
        //   taskDescription={taskDescription}
        //   taskDue={taskDue}
        //   taskisComplete={taskisComplete}
        //   setEditTask={setEditTask}
        //   handleTaskEdit={handleTaskEdit}
        // />
        <EditTaskcopy
          key={taskId}
          taskId={taskId}
          taskDescription={taskDescription}
          taskDue={taskDue}
          taskisComplete={taskisComplete}
          setEditTask={setEditTask}
          handleTaskEdit={handleTaskEdit}
        />
      ) : null}
    </>
  );
}

// <div className="task-design-edit">
//   <div className="task-design-edit-text">
//     <input
//       className="task-edit-input"
//       type="text"
//       value={taskDescription}
//       onChange={(e) => {
//         setTaskDescriptionInput(e.target.value);
//       }}
//     />
//   </div>
//   <div className="task-design-edit-due">
//     <div className="task-edit-due-text">
//       <input
//         className="task-edit-due-input"
//         type="text"
//         value={taskDue}
//         onChange={(e) => {
//           setTaskDueInput(e.target.value);
//         }}
//       />
//     </div>
//   </div>

{
  /* <div className="task-design-edit">
          <div className="task-design-edit-button">
            <button
              className="task-edit-button"
              onClick={() => {
                setEditTask(true);
              }}
            >
              Edit
            </button>
          </div>
        </div> */
}
