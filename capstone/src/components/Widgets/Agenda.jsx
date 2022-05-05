import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

import "../../styles/CKEditor.scss";

export default function Agenda() {
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

  return (
    <div className="org-agenda-container">
      {/* <h1>Organization.name</h1>
      <p>
        The Organization page is where you can view and edit your organization's
        information.
      </p> */}
      <h2>Meeting Agenda</h2>
      <textarea
        className="org-agenda-textarea"
        placeholder={agenda}
        value={agenda}
        disabled={agendaEditState}
        onChange={(e) => {
          setAgenda(e.target.value);
          setAgendaText(e.target.value);
        }}
        style={
          agendaEditState
            ? {
                backgroundColor: "#343142a8",
                color: "rgba(255, 255, 255, 0.3)",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                height: "100%",
              }
            : null
        }
      />
      <div className="org-agenda-buttons-container">
        <button className="agenda-buttons" onClick={saveAgenda}>
          Save
        </button>
        <button className="agenda-buttons" onClick={toggleAgendaEdit}>
          Edit
        </button>
      </div>
      {/* <CKEditor
        editor={ClassicEditor}
        data="<p className='editor-text-color'>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      /> */}
      {/* <button className="org-agenda-button" onClick={setSaveState(true)}>
        Save
      </button> */}
    </div>
  );
}
