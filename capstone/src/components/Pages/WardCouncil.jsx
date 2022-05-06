import React from "react";

import Agenda from "../Widgets/Agenda";
import Tasks from "../Widgets/Tasks";
import "../../styles/WardCouncil.scss";
import Notes from "../Widgets/Notes";
import NotesCopy from "../Widgets/Notes copy";

export default function WardCouncil() {
  return (
    <div className="wc">
      <header className="wc-header">
        <h1>Department Name Here</h1>
      </header>
      <div className="wc-container">
        <div className="wc-container-top">
          <Agenda />
        </div>
        <div className="wc-container-left">
          <h2>Assignments</h2>
          <Tasks />
        </div>
        <div className="wc-container-right">
          <h2>Notes</h2>
          <NotesCopy />
        </div>
      </div>
    </div>
  );
}
