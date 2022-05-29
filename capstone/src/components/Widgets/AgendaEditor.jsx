import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  //   const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  //   let [agenda, setAgenda] = useState([]);
  let [state, setState] = useState(false);
  //   let [agendaText, setAgendaText] = useState("");
  let [agendaEditState, setAgendaEditState] = useState(true);
  let [saveState, setSaveState] = useState(false);

  const userInfo = useSelector((state) => state.globalStore.userInfo);
  const userAgenda = useSelector((state) => state.globalStore.agenda);
  const agendaId = userInfo.user_org;

  // Get agenda from database
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:5000/api/v1/agenda/${userInfo.user_org}`)
  //       .then((res) => {
  //         setAgenda(res.data[0].agenda_text);
  //         setAgendaText(res.data[0].agenda_text);

  //         console.log(res.data[0].agenda_text);
  //         setState(true);
  //         // console.log(state);
  //       })
  //       //   .then(() => {
  //       //     console.log("AGENDA: ", agenda);
  //       //     quill.setContents(agenda);
  //       //   })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  // Toggle agenda edit state
  function saveAgenda() {
    // let data = JSON.stringify({
    //   agenda_text: agendaText,
    //   agenda_id: userInfo.user_org,
    // });

    // // console.log("WHAT IS BEING SENT OUT: ", data);
    // axios
    //   .post(`http://localhost:5000/api/v1/agenda-update`, data, {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res) => {
    //     setAgendaEditState(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    setAgendaEditState(false);
  }

  // Toggle agenda edit state
  function toggleAgendaEdit() {
    setAgendaEditState(true);
    // console.log("EDIT STATE: ", agendaEditState);
  }

  // Connect with Socket.io
  useEffect(() => {
    // const s = io("http://localhost:5000/agenda", {
    //   reconnectionDelay: 1000,
    //   reconnection: true,
    //   reconnectionAttempts: 10,
    //   transports: ["websocket"],
    //   agent: false,
    //   upgrade: false,
    //   rejectUnauthorized: false,
    // })
    //   //   .connect({ query: { user_id: userInfo.user_id } })
    //   .on("connect", () => {
    //     console.log("connected");

    //     s.emit("join", {
    //       user_id: userInfo.user_id,
    //       user_org: userInfo.user_org,
    //     });
    //   });
    const s = io("http://localhost:5001", {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 5,
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
      withCredentials: true,
      extraHeaders: {
        // "Access-Control-Allow-Origin": "*:*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods":
        //   "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        // "Access-Control-Allow-Headers":
        //   "X-Requested-With, content-type, Authorization",
        // "Access-Control-Expose-Headers": "*",
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Max-Age": "1728000",
        "Content-Type": "application/json",
      },
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Gets the agenda text from the database \\
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-agenda", async (SocketAgenda) => {
      console.log("LOADED AGENDA: ", SocketAgenda);
      try {
        await quill.setContents(JSON.parse(SocketAgenda), "api");
        await quill.enable();
      } catch (err) {
        console.log(err);
      }
      //   quill.setContents(SocketAgenda);
      //   quill.setText(SocketAgenda);
      //   quill.enable();
    });

    socket.emit("get-agenda", agendaId);
  }, [socket, quill, agendaId]);

  // Saves Updates to Agenda \\
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-agenda", {
        content: quill.getContents(),
        agendaId,
      });
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  // Handle Quill Changes - RECEIVES Changes \\
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      console.log("DELTA: ", delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  // Handle Quill Changes - SENDS Changes \\
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  // Create Quill Editor \\
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
      //   options: {
      //     placeholder: agenda[0],
      //     readOnly: agendaEditState,
      //   },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <>
      <div className="org-widget-container editor" ref={wrapperRef}>
        <div className="child-widget-container">
          {/* <div className="child-widget-subcontainer"></div> */}
        </div>
      </div>
      <div className="org-agenda-buttons-container">
        <button className="agenda-editor-buttons" onClick={saveAgenda}>
          Save
        </button>
        <button className="agenda-editor-buttons" onClick={toggleAgendaEdit}>
          Edit
        </button>
      </div>
    </>
  );
}
