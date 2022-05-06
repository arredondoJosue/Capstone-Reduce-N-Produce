require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { connect, test, messages } = require("./controllers/controller");
const {
  getTasks,
  newTask,
  completedTask,
  updateTask,
} = require("./controllers/tasksController");
const { getUser, getAllUsers } = require("./controllers/usersController");
const {
  getUserNotes,
  newNote,
  updateNote,
  getAgenda,
  updateAgenda,
} = require("./controllers/notesController");

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

// TASK
app.get(baseURL + "/tasks/:user_id", getTasks);
app.post(baseURL + "/tasks/new-task", newTask);
app.put(baseURL + "/tasks/completed_task/:user_id", completedTask);
app.put(baseURL + "/tasks/update/:task_id", updateTask);

// USER
app.get(baseURL + "/user/:uid", getUser);
app.get(baseURL + "/users", getAllUsers);

// NOTES
app.get(baseURL + "/notes/:user_id", getUserNotes);
app.post(baseURL + "/notes/new-note", newNote);
app.put(baseURL + "/notes/update/:note_id", updateNote);

// AGENDA
app.get(baseURL + "/agenda/:agenda_id", getAgenda);
app.post(baseURL + "/agenda-update", updateAgenda);

// CALLING
app.get(baseURL + "/proposed-callings", getProposedCallings);
app.get(baseURL + "/proposed-callings/approval", getApprovalCallings);
app.get(baseURL + "/proposed-callings/contact", getContactCallings);
app.get(baseURL + "/proposed-callings/sustain-set-apart", getSustainCallings);
app.get(baseURL + "/proposed-callings/lcr", getLCRCallings);

app.listen(process.env.REACT_APP_SERVER_PORT, () =>
  console.log(`up on ${process.env.REACT_APP_SERVER_PORT}`)
);
