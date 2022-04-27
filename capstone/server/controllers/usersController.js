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
  getUser:
    ("/api/v1/user",
    (req, res) => {
      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          "SELECT * FROM users"
        )
        .then((user) => {
          console.log(user[0]);
          res.status(200).send(user[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
