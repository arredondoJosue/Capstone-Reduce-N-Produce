import React from "react";

export default function NewTask() {
  return (
    <div>
      <form>
        <label>
          Task Description:
          <input type="text" name="taskDescription" />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="taskDue"
            defaultValue={new Date(Date.now() + 1)}
          />
        </label>
        <label>
          Assigned to(optional):
          <select name="taskAssignee">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
