import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import "../styles/NewTask.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks, setPopoverTask } from "../Hooks/userSlice";

export default function NewTask() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.globalStore.userInfo);
  const users = useSelector((state) => state.globalStore.allUsers);
  const popToggle = useSelector((state) => state.globalStore.popoverTask);

  const defaultDate = new Date(Date() + 1);
  const formattedDate =
    defaultDate.getFullYear() +
    "-" +
    (defaultDate.getMonth() + 1) +
    "-" +
    defaultDate.getDate();
  console.log(users);

  let x = user.user_id;
  return (
    <div className="new-task">
      {/* <div className="new-task-header">
        <h3 className="new-task-title">Add New Task</h3>
      </div> */}

      <div className="new-task-body">
        <Formik
          initialValues={{
            description: "", // task_description
            dueDate: { formattedDate }, // task_due
            priority: "", // task_priority
            user_id: x, // task_author_id INT
            status: "", // task_status
            assignedTo: "", // task_assignee_id INT
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              console.log(typeof values.dueDate);
              axios
                .post("http://localhost:5000/api/v1/tasks/new-task", values)
                .then((res) => {
                  console.log("RESPONSE AFTER TASKS POST: ", res);
                  values.description = "";
                  values.dueDate = { formattedDate };
                  values.priority = "";
                  values.status = "";
                  values.assignedTo = "";
                  dispatch(setPopoverTask(!popToggle));
                  // dispatch(setTasks(res.data)); // set tasks to the response data from the server
                })
                .then(() => {
                  axios
                    .get(`http://localhost:5000/api/v1/tasks/${user.user_id}`)
                    .then((res) => {
                      console.log("hit the tasks get route with: ", res.data);
                      dispatch(setTasks(res.data)); // set tasks to the response data from the server
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="new-task-form">
              <div className="new-task-form">
                <div className="new-task-form-section-top">
                  <div className="new-task-form-field">
                    <label
                      className="new-task-form-field-label"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <Field
                      className="new-task-form-description"
                      type="text"
                      name="description"
                    />
                  </div>
                </div>
                <div className="new-task-form-section-bottom">
                  <div className="new-task-form-field">
                    <label
                      className="new-task-form-field-label"
                      htmlFor="dueDate"
                    >
                      Due Date
                    </label>
                    <Field
                      className="new-task-form-due"
                      type="date"
                      name="dueDate"
                    />
                  </div>
                  <div className="new-task-form-field">
                    <label
                      className="new-task-form-field-label"
                      htmlFor="priority"
                    >
                      Priority
                    </label>
                    <Field
                      className="new-task-form-priority"
                      as="select"
                      name="priority"
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Field>
                  </div>
                  <div className="new-task-form-field">
                    <label
                      className="new-task-form-field-label"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <Field
                      className="new-task-form-status"
                      as="select"
                      name="status"
                    >
                      <option value="">Select Status</option>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Field>
                  </div>

                  <div className="new-task-form-field">
                    <label
                      className="new-task-form-field-label"
                      htmlFor="assignedTo"
                    >
                      Assign
                    </label>
                    <Field
                      className="new-task-form-assigned"
                      as="select"
                      name="assignedTo"
                      placeholder="Select Assignee"
                    >
                      {/* <option value="">Select</option> */}
                      {/* <option value={1}>John Doe</option>
                      <option value={2}>Jane Doe</option>
                      <option value={3}>Joe Doe</option> */}
                      {users.map((user) => {
                        return (
                          <option value={user.user_id}>{user.user_name}</option>
                        );
                      })}
                    </Field>
                  </div>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
//         <div>
//           <label>
//             Task Description:
//             <input
//               className="new-task-input"
//               type="text"
//               name="taskDescription"
//             />
//           </label>
//           <label>
//             Due Date:
//             <input
//               className="new-task-input"
//               type="date"
//               name="taskDue"
//               defaultValue={new Date(Date.now() + 1)}
//             />
//           </label>
//           <label>
//             Priority:
//             <select className="new-task-input" name="taskPriority">
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//             Assigned to(optional):
//             <select className="new-task-input" name="taskAssignee">
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//           </label>
//           <input className="new-task-button" type="submit" value="Submit" />
//         </Formik>
//       </div>
//     </div>
//   );
// }
