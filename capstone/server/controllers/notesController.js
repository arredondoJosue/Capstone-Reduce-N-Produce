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
  getNotes:
    ("/api/v1/notes",
    (req, res) => {
      sequelize
        .query("SELECT * FROM notes")
        .then((notes) => {
          console.log(notes[0]);
          res.status(200).send(notes[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
