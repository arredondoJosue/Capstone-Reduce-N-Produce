import React from "react";

export default function TaskInfo() {
  return (
    <div>
      <form>
        <label>
          Task Description:
          <input type="text" name="taskDescription" />
        </label>
        <label>
          Due Date:
          <input type="date" name="taskDue" />
        </label>
        <label>
          <select name="taskAssignee">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          <input type="checkbox" name="isCompleted" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
