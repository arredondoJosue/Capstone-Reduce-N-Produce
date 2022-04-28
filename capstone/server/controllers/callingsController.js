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
  getProposedCallings:
    ("/api/v1/proposed-callings",
    (req, res) => {
      sequelize
        .query("SELECT * FROM proposed_callings")
        .then((proposed_callings) => {
          res.status(200).send(proposed_callings[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getApprovalCallings:
    ("/api/v1/proposed-callings/approval",
    (req, res) => {
      sequelize
        .query(
          `SELECT * FROM proposed_callings WHERE proposed_phase = 'Approval'`
        )
        .then((proposed_callings) => {
          res.status(200).send(proposed_callings[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getContactCallings:
    ("/api/v1/proposed-callings/contact",
    (req, res) => {
      sequelize
        .query(
          `SELECT * FROM proposed_callings
        WHERE proposed_phase = 'Contact'`
        )
        .then((proposed_callings) => {
          res.status(200).send(proposed_callings[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getSustainCallings:
    ("/api/v1/proposed-callings/sustain-set-apart",
    (req, res) => {
      sequelize
        .query(
          `SELECT * FROM proposed_callings
        WHERE proposed_phase = 'Sustain & Set Apart'`
        )
        .then((proposed_callings) => {
          res.status(200).send(proposed_callings[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getLCRCallings:
    ("/api/v1/proposed-callings/lcr",
    (req, res) => {
      sequelize
        .query(
          `SELECT * FROM proposed_callings
        WHERE proposed_phase = 'LCR'`
        )
        .then((proposed_callings) => {
          res.status(200).send(proposed_callings[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
