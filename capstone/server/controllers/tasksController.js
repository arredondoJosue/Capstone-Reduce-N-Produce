const Sequelize = require("sequelize");
require("dotenv").config();

const connection = process.env.REACT_APP_CONNECTION_STRING;

// To Add Heroku DB with Postgres
const sequelize = new Sequelize(connection, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getTasks:
    ("/api/v1/tasks/:user_id",
    (req, res) => {
      console.log("HIT GET TASKS BACKEND ", req.params.user_id);
      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          `SELECT * FROM tasks
          WHERE task_author_id = ${req.params.user_id} 
          AND task_iscomplete = FALSE`
        )
        .then((tasks) => {
          // console.log(tasks[0]);
          res.status(200).send(tasks[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  newTask:
    ("/api/v1/tasks/new-task",
    (req, res) => {
      const { description, dueDate, user_id, assignedTo } = req.body;
      // const task_due_esc = req.params.due_date;

      const task_description_esc = description.replace(/'/g, "''");
      const task_due_esc =
        typeof dueDate === "object" ? dueDate.formattedDate : dueDate;
      const task_assignee_id_esc =
        assignedTo === "" ? null : assignedTo.replace(/'/g, "''");

      sequelize
        .query(
          `INSERT INTO tasks(task_description, task_created_at, task_due, task_iscomplete, task_author_id, task_assingee_id)
          VALUES ('${task_description_esc}', NOW(), '${task_due_esc}', FALSE, ${user_id}, ${task_assignee_id_esc})`
        )
        .then((task) => {
          res.status(200).send(task[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  completedTask:
    ("/api/v1/tasks/completed_task/:user_id",
    (req, res) => {
      console.log("user_id ", req.params.user_id);
      console.log("task_id ", req.body.task_id);
      console.log("isComplete", req.body.isComplete);
      sequelize
        .query(
          `UPDATE tasks
          SET task_iscomplete = ${req.body.isComplete}
          WHERE task_author_id = ${req.params.user_id}
          AND task_id = ${req.body.task_id}`
        )
        .then((tasks) => {
          // console.log(tasks[0]);
          res.status(200).send(tasks[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  updateTask:
    ("/api/v1/tasks/update/:task_id",
    (req, res) => {
      const { taskDescription, taskDue } = req.body;
      // const task_due_esc = req.params.due_date;

      const task_description_esc = taskDescription.replace(/'/g, "''");
      // const task_due_esc =
      //   typeof dueDate === "object" ? dueDate.formattedDate : dueDate;
      // const task_assignee_id_esc =
      //   assignedTo === "" ? null : assignedTo.replace(/'/g, "''");

      // console.log("taskDescription ", req.body.taskDescription);
      // console.log("task_id ", req.params.task_id);
      // console.log("isComplete", req.body.taskDue);
      sequelize
        .query(
          `UPDATE tasks
          SET task_description = '${task_description_esc}', task_due = '${taskDue}'
          WHERE task_id = ${req.params.task_id}`
        )
        .then((tasks) => {
          // console.log(tasks[0]);
          res.status(200).send(tasks[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
