import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NotesList from "./NotesList";

export default function Tasks() {
  let [notes, setNotes] = useState([]);

  const userInfo = useSelector((state) => state.globalStore.userInfo);
  const userNotes = useSelector((state) => state.globalStore.notes);

  // Gets all of the current user's tasks
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/notes/${userInfo.user_id}`)
      .then((res) => {
        // setTasks((prev) => [...prev, ...res.data]);
        setNotes(res.data);
      });
  }, [userNotes]);

  // Marks a task as complete and updates the database
  function handleChangeChecked(note_id, note_title, note_text) {
    console.log(
      "hit handle fx with task_id: " + note_id + " and note_text: " + note_text
    );

    axios
      .put(
        `http://localhost:5000/api/v1/notes/update-note/${userInfo.user_id}`,
        {
          note_title,
          note_text,
        }
      )
      .then((res) => {
        setNotes((prev) => {
          let newState = prev.filter((note) => note.note_id !== note_id);
          return newState;
        });
        console.log(notes);
      });
  }

  function handleNoteEdit(note_id, values) {
    console.log("hit handleTaskEdit with task_id: " + note_id);
    console.log("hit handleTaskEdit with values: ", values);
    setNotes(values);
    // setTasks((prev) => {
    //   let newState = prev.filter((task) => task.task_id !== task_id);
    //   return newState;
    // });
  }

  // Maps through the tasks and creates a list of tasks
  let notesList = notes.map((note, i) => {
    return (
      <NotesList
        key={i}
        noteId={note.note_id}
        noteTitle={note.note_title}
        noteText={note.note_text}
        handleChangeChecked={handleChangeChecked}
        handleNoteEdit={handleNoteEdit}
        setNotes={setNotes}
      />
    );
  });

  return (
    <div className="org-widget-container">
      <div className="child-widget-container">
        {
          (notes = [] ? (
            notesList
          ) : (
            <h2 style={{ color: "grey" }}>You have no notes to display</h2>
          ))
        }
      </div>
    </div>
  );
}
