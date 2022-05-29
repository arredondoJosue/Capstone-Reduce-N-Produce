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
const {
  createUser,
  getUser,
  getAllUsers,
} = require("./controllers/usersController");
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
app.post(baseURL + "/user/register/:uid", createUser);
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

// const io = require("socket.io")(
//   app.listen(process.env.REACT_APP_SERVER_PORT || 3000),
//   {
//     origins: "*:*",
//   }
// );
const Sequelize = require("sequelize");
const server = require("http").createServer(app);
// const io = require("socket.io")(server);
// const { createServer } = require("http");
const { Server } = require("socket.io");
// console.log("io is: ", io);

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

const io = require("socket.io")(app.listen(5001), {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});
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

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("get-agenda", (agendaId) => {
    socket.join(agendaId);
    // console.log("GET-AGENDA ID", agendaId);

    // Gets the agenda from the DB via SQL query
    sequelize
      .query(
        `
        SELECT agenda_text FROM agenda
        WHERE agenda_org_id = ${agendaId}`
      )
      .then(([rows]) => {
        console.log("GOT AGENDA ==>", rows[0].agenda_text);
        socket.emit("load-agenda", rows[0].agenda_text);
      })
      .catch((err) => console.log(err));

    socket.on("send-changes", (delta) => {
      // console.log("DELTA ===>", delta);
      socket.broadcast.to(agendaId).emit("receive-changes", delta);
    });

    socket.on("save-agenda", (quill) => {
      // console.log("SAVE-AGENDA", quill.content);
      // console.log("SAVE-AGENDA ID", quill.agendaId);

      // let agendaText = quill.content.ops[0].insert;
      let agendaText = JSON.stringify(quill.content.ops);
      console.log("SAVE AGENDA TEXT ==>", agendaText);
      // console.log("SAVE AGENDA TEXT ==>", JSON.stringify(quill.content));
      let agendaId = quill.agendaId;

      sequelize
        .query(
          `
          UPDATE agenda
          SET agenda_text = '${agendaText}',
          agenda_updated_at = NOW()
          WHERE agenda_org_id = ${agendaId}`
        )
        .then(([rows]) => {
          // console.log("ROWS", rows);
          console.log("AGENDA UPDATED IN DB");
          socket.broadcast.to(agendaId).emit("receive-changes", agendaText);
        })
        .catch((err) => {
          console.log(err);
        });

      // updateAgenda(agendaId)
      //   .then((updatedAgenda) => {
      //     socket.broadcast.to(agendaId).emit("update-agenda", updatedAgenda);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
