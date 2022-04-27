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
    ("/api/v1/tasks",
    (req, res) => {
      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          "SELECT * FROM tasks"
        )
        .then((tasks) => {
          console.log(tasks[0]);
          res.status(200).send(tasks[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
