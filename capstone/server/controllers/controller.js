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
  connect:
    ("/api/v1",
    async (req, res) => {
      let test = "Server connected with Controller and sent to Front End";
      // try {
      //   await sequelize.authenticate();
      //   console.log("Connection has been established successfully.");
      // } catch (error) {
      //   console.error("Unable to connect to the database:", error);
      // }
      res.status(200).send(test);
    }),
  test:
    ("/api/v1/test",
    (req, res) => {
      let x = { user: "me", id: "1", name: "Bebz" };
      res.status(200).send(x);
    }),
  messages:
    ("/api/v1/messages",
    (req, res) => {
      let y = [
        { id: "1", text: "Hello World" },
        { id: "2", text: "Hello World" },
      ];
      res.status(200).send(y);
    }),
  tasks:
    ("/api/v1/tasks",
    (req, res) => {
      let t = [
        { id: "1", task: "Write Capstone" },
        { id: "2", task: "vibe" },
        { id: "3", task: "sleep" },
      ];
      res.status(200).send(t);
    }),
};
