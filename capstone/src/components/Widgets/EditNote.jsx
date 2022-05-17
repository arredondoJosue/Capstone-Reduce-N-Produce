import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function EditNote({
  noteId,
  noteTitle,
  noteText,
  handleChangeChecked,
  handleNoteEdit,
  setShowEdit,
}) {
  // const {noteInput, setNoteInput} = useState({
  //   note_title: "",
  //   note_text: "",
  // });
  const [noteInput, setNoteInput] = useState("");
  const [noteInputText, setNoteInputText] = useState("");
  const user = useSelector((state) => state.globalStore.userInfo);

  useEffect(() => {
    setNoteInput(noteTitle);
    setNoteInputText(noteText);
  }, [noteTitle, noteText]);

  function handleSubmit(values) {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      axios
        .put(`http://localhost:5000/api/v1/notes/update/${noteId}`, values)
        .then((res) => {
          console.log(res.data);
          // setTaskInput("");
          // setTaskDueInput("");
          // handleTaskEdit(taskId);
        })
        .then(() => {
          axios
            .get(`http://localhost:5000/api/v1/notes/${user.user_id}`)
            .then((res) => {
              handleNoteEdit(noteId, res.data);
              console.log("2nd axios get notes data: ", res.data);
              // dispatch(setTasks(res.data));
              console.log("hit the notes get route");
              setShowEdit(false);
              console.log("hit the notes get route 2");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }

  return (
    <div className="org-widget-container notes">
      <div className="child-widget-container notes-container">
        <div className="child-widget-subcontainer notes-subcontainer">
          <div className="note-id">{noteId}</div>

          <div className="note-title">
            <input
              type="text"
              onChange={(e) => setNoteInput(e.target.value)}
              defaultValue={noteTitle}
            />
          </div>
          <div className="note-text">
            <textarea
              type="text"
              onChange={(e) => setNoteInputText(e.target.value)}
              defaultValue={noteText}
            />
          </div>
          <div className="task-design-edit-button">
            <button
              className="task-edit-button"
              type="submit"
              onClick={() => {
                handleSubmit({
                  note_title: noteInput,
                  note_text: noteInputText,
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
