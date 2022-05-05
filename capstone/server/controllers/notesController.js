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
  getUserNotes:
    ("/api/v1/notes/:user_id",
    (req, res) => {
      sequelize
        .query(
          `SELECT * FROM notes
        WHERE note_author_id = ${req.params.user_id}`
        )
        .then((notes) => {
          // console.log(notes[0]);
          res.status(200).send(notes[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  newNote:
    (`/api/v1/notes/new-note`,
    (req, res) => {
      const { noteTitle, noteText, sharedWith, user_id } = req.body;

      // const agenda_text_esc = sequelize.escape(agenda_text);
      const note_title_esc = noteTitle.replace(/'/g, "''");
      const note_text_esc = noteText.replace(/'/g, "''");
      const shared_with_esc =
        sharedWith === "" ? null : sharedWith.replace(/'/g, "''");

      console.log("USER: ", user_id);

      sequelize
        .query(
          `
        INSERT INTO notes(note_title, note_text, note_timestamp, note_author_id, note_shared_with)
        VALUES ('${note_title_esc}', '${note_text_esc}', NOW(), ${user_id} , ${shared_with_esc})`
        )
        .then((note) => {
          res.status(200).send(note);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getAgenda:
    ("/api/v1/agenda/:agenda_id",
    (req, res) => {
      sequelize
        .query(
          `
        SELECT agenda_text FROM agenda
        WHERE agenda_org_id = ${req.params.agenda_id}`
        )
        .then((agenda) => {
          // console.log(agenda[0]);
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
