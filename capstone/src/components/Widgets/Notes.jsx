import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Widgets.scss";

export default function Notes() {
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/notes").then((res) => {
      setNotes(res.data);
    });
  }, []);

  let notesList = notes.map((note) => {
    return (
      <div className="child-widget-subcontainer">
        <div>{note.note_id}</div>
        <div>Title: {note.note_title}</div>
        <div>{note.note_text}</div>
      </div>
    );
  });

  return (
    <div className="org-widget-container notes">
      {/* <h1>Notes</h1> */}
      <div className="child-widget-container">
        {notes ? notesList : "No Notes"}
        {/* <div className="child-widget-subcontainer">Note 1</div>
        <div className="child-widget-subcontainer">Note 1</div> */}
      </div>
    </div>
  );
}
