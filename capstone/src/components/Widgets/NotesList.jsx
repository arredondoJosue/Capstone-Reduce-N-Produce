import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../Hooks/userSlice";
import axios from "axios";
import "../../styles/Widgets.scss";

import EditNote from "./EditNote";

export default function Notes({
  noteId,
  noteTitle,
  noteDate,
  noteText,
  handleChangeChecked,
  handleNoteEdit,
  setNotes,
}) {
  let [notes, setNotesComponent] = useState([]);
  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userInfo = useSelector((state) => state.globalStore.userInfo);
  const dispatch = useDispatch();

  const noteDateFormatted = new Date(noteDate).toLocaleDateString();

  // Gets all notes from the database and sets them to the notes state
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/notes/${userInfo.user_id}`)
      .then((res) => {
        setNotesComponent(res.data);
        // dispatch(setNotes(notes));
      });
  }, []);

  // function randomKey() {
  //   return Math.random().toString(36).substring(7);
  // }

  // let notesList = notes.map((note) => {
  //   return (
  //     <>
  //       <div
  //         className="child-widget-subcontainer notes-subcontainer"
  //         key={note.note_id}
  //       >
  //         {/* <div className="notes-subcontainer-top"> */}
  //         <span
  //           className="material-symbols-outlined"
  //           onClick={() => setShow(!show)}
  //         >
  //           edit_note
  //         </span>
  //         <div className="note-id">{note.note_id}</div>
  //         <div className="note-id">{note.note_id}</div>
  //         <div className="note-title">{note.note_title}</div>
  //         {/* </div> */}
  //         {/* <div className="notes-subcontainer-bottom"> */}
  //         <div className="note-text">{note.note_text}</div>
  //         {/* </div> */}
  //       </div>
  //       {show ? (
  //         <EditNote
  //           key={randomKey()}
  //           note={note}
  //           handleClose={handleClose}
  //           handleShow={handleShow}
  //         />
  //       ) : null}
  //     </>
  //   );
  // });

  return (
    <>
      {/* <div className="org-widget-container notes"> */}
      <div className="notes">
        {/* <div className="child-widget-container notes-container"> */}
        <div className="note-design notes-subcontainer-top">
          {/* <span
            className="material-symbols-outlined note-checkbox"
            onClick={() => setShow(!show)}
          >
            edit_note
          </span> */}
          <div className="note-title">{noteTitle}</div>
          {/* <div className="child-widget-subcontainer notes-subcontainer"> */}
          <div
            className="note-design-content notes-subcontainer-bottom"
            onClick={() => setShow(!show)}
          >
            {/* <div className="notes-subcontainer-top"> */}
            {/* <span
              className="material-symbols-outlined"
              onClick={() => setShow(!show)}
            >
              edit_note
            </span> */}
            <div className="note-id">{noteId}</div>
            <div className="note-id">{noteId}</div>
            {/* <div className="note-title">{noteTitle}</div> */}
            {/* </div> */}
            {/* <div className="notes-subcontainer-bottom"> */}
            <input
              className="note-text"
              value={noteDateFormatted + "  " + noteText}
              disabled
            />
            {/* <input className="note-text" value={noteText} disabled /> */}
            {/* </div> */}
          </div>
          {show ? (
            <EditNote
              key={noteId}
              noteId={noteId}
              noteTitle={noteTitle}
              noteText={noteText}
              handleChangeChecked={handleChangeChecked}
              handleNoteEdit={handleNoteEdit}
              setShowEdit={setShow}
              setNotes={setNotes}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
