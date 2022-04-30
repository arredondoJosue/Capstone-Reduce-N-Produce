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
      console.log(req.params.user_id);
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
};
