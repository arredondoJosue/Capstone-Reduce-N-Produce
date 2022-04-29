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
          // console.log(notes[0]);
          res.status(200).send(notes[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getAgenda:
    ("/api/v1/agenda",
    (req, res) => {
      sequelize
        .query(
          `
        SELECT agenda_text FROM agenda
        WHERE agenda_id = 1`
        )
        .then((agenda) => {
          res.status(200).send(agenda[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  updateAgenda:
    (`/api/v1/agenda-update`,
    (req, res) => {
      const { agenda_id, agenda_text } = req.body;

      // const agenda_text_esc = sequelize.escape(agenda_text);
      const agenda_text_esc = agenda_text.replace(/'/g, "''");

      sequelize
        .query(
          `
        UPDATE agenda
        SET agenda_text = '${agenda_text_esc}', 
        agenda_updated_at = NOW()
        WHERE agenda_id = ${agenda_id}`
        )
        .then((agenda) => {
          res.status(200).send(agenda);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
