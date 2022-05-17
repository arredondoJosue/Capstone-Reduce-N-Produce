import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Quill from "quill";
import "quill/dist/quill.snow.css";
// import { io } from "socket.io-client"
import { useParams } from "react-router-dom";
import axios from "axios";

// const SAVE_INTERVAL_MS = 2000
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
  const { id: documentId } = useParams();
  // const [socket, setSocket] = useState()
  const [quill, setQuill] = useState();
  let [agenda, setAgenda] = useState([]);
  let [state, setState] = useState(false);
  let [agendaText, setAgendaText] = useState("");
  let [agendaEditState, setAgendaEditState] = useState(true);
  let [saveState, setSaveState] = useState(false);

  const userInfo = useSelector((state) => state.globalStore.userInfo);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/agenda/${userInfo.user_org}`)
      .then((res) => {
        setAgenda(res.data[0].agenda_text);
        // console.log(res.data[0].agenda_text);
        setState(true);
        // console.log(state);
      });
  }, []);

  function saveAgenda() {
    let data = JSON.stringify({
      agenda_text: agendaText,
      agenda_id: userInfo.user_org,
    });

    // console.log("WHAT IS BEING SENT OUT: ", data);
    axios
      .post(`http://localhost:5000/api/v1/agenda-update`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setAgendaEditState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleAgendaEdit() {
    setAgendaEditState(!agendaEditState);
    console.log("EDIT STATE: ", agendaEditState);
  }

  // useEffect(() => {
  //   const s = io("http://localhost:3001")
  //   setSocket(s)

  //   return () => {
  //     s.disconnect()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   socket.once("load-document", document => {
  //     quill.setContents(document)
  //     quill.enable()
  //   })

  //   socket.emit("get-document", documentId)
  // }, [socket, quill, documentId])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const interval = setInterval(() => {
  //     socket.emit("save-document", quill.getContents())
  //   }, SAVE_INTERVAL_MS)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [socket, quill])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const handler = delta => {
  //     quill.updateContents(delta)
  //   }
  //   socket.on("receive-changes", handler)

  //   return () => {
  //     socket.off("receive-changes", handler)
  //   }
  // }, [socket, quill])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const handler = (delta, oldDelta, source) => {
  //     if (source !== "user") return
  //     socket.emit("send-changes", delta)
  //   }
  //   quill.on("text-change", handler)

  //   return () => {
  //     quill.off("text-change", handler)
  //   }
  // }, [socket, quill])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    q.setText(`${agenda}`);
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
        <button className="agenda-editor-buttons">Save</button>
        <button className="agenda-editor-buttons">Edit</button>
      </div>
    </>
  );
}
