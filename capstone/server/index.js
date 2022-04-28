require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { connect, test, messages } = require("./controllers/controller");
const { getTasks } = require("./controllers/tasksController");
const { getUser } = require("./controllers/usersController");
const { getNotes } = require("./controllers/notesController");
const {
  getProposedCallings,
  getApprovalCallings,
  getContactCallings,
  getSustainCallings,
  getLCRCallings,
} = require("./controllers/callingsController");
const { seed } = require("./seed");

app.use(express.json());
app.use(cors());

const baseURL = "/api/v1";

app.post(baseURL + "/seed", seed);
app.get(baseURL, connect);
app.get(baseURL + "/test", test);
app.get(baseURL + "/messages", messages);

app.get(baseURL + "/tasks", getTasks);

app.get(baseURL + "/user", getUser);

app.get(baseURL + "/notes", getNotes);

app.get(baseURL + "/proposed-callings", getProposedCallings);
app.get(baseURL + "/proposed-callings/approval", getApprovalCallings);
app.get(baseURL + "/proposed-callings/contact", getContactCallings);
app.get(baseURL + "/proposed-callings/sustain-set-apart", getSustainCallings);
app.get(baseURL + "/proposed-callings/lcr", getLCRCallings);

app.listen(process.env.REACT_APP_SERVER_PORT, () =>
  console.log(`up on ${process.env.REACT_APP_SERVER_PORT}`)
);
