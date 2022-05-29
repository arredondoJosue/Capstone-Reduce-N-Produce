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
  createUser:
    ("/api/v1/user/register/:uid",
    (req, res) => {
      const { firstName, lastName, email, calling, org } = req.body;

      const first_name_esc = firstName.replace(/'/g, "''");
      const last_name_esc = lastName.replace(/'/g, "''");
      const email_esc = email.replace(/'/g, "''");
      const user_name = first_name_esc + " " + last_name_esc;
      const user_initials = first_name_esc[0] + last_name_esc[0];
      const isAdmin = () => {
        if (calling === 1) {
          return false;
        } else {
          return true;
        }
      };

      const { uid } = req.params;

      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          `INSERT INTO users(first_name, last_name, user_name, user_email, isAdmin, user_calling, user_org, user_ward, user_initials, user_avatar_color, user_created_at, uid)
          VALUES('${first_name_esc}', '${last_name_esc}', '${user_name}', '${email_esc}', ${isAdmin()}, (SELECT calling_id from callings where calling_id = ${calling}), (SELECT org_id from org where org_id = ${org}), (SELECT ward_id from ward where ward_id = 1), '${user_initials}', 'default', NOW(), '${uid}')
          `
        )
        .then((user) => {
          // console.log(user[0]);
          res.status(200).send(user[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getUser:
    ("/api/v1/user/:uid",
    (req, res) => {
      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          `SELECT * FROM users
          WHERE uid = '${req.params.uid}';`
        )
        .then((user) => {
          // console.log(user[0]);
          res.status(200).send(user[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
  getAllUsers:
    ("/api/v1/users",
    (req, res) => {
      sequelize
        .query(
          // "SELECT * FROM tasks INNER JOIN users ON tasks.user_id = users.user_id"
          `SELECT * FROM users;`
        )
        .then((user) => {
          // console.log(user[0]);
          res.status(200).send(user[0]);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }),
};
