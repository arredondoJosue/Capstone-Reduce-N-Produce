import React from "react";

import Tasks from "../Widgets/Tasks";
import Notes from "../Widgets/Notes";
import Agenda from "../Widgets/Agenda";

export default function Org() {
  return (
    <div className="Org">
      <Agenda />
      <div className="org-bottom">
        <div className="section1">
          <h2>Tasks</h2>
          <Tasks />
        </div>

        <div className="section2">
          <h2>Notes</h2>
          <Notes />
        </div>
      </div>
    </div>
  );
}
