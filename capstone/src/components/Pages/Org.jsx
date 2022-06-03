import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Tasks from "../Widgets/Tasks";
import Notes from "../Widgets/Notes";
import NotesCopy from "../Widgets/Notes copy";
import Agenda from "../Widgets/Agenda";
import AgendaCopy from "../Widgets/AgendaEditor";

export default function Org() {
  const userInfo = useSelector((state) => state.globalStore.userInfo);

  const orgName = () => {
    if (userInfo.user_org === 1) {
      return "Bishopric";
    } else if (userInfo.user_org === 2) {
      return "Elder's Quorum";
    } else if (userInfo.user_org === 3) {
      return "Relief Society";
    } else if (userInfo.user_org === 4) {
      return "Primary";
    }
  };

  let org = orgName();

  return (
    // <div className="Org">
    //   <Agenda />
    //   <div className="org-bottom">
    //     <div className="section1">
    //       <h2>Tasks</h2>
    //       <Tasks />
    //     </div>

    //     <div className="section2">
    //       <h2>Notes</h2>
    //       <Notes />
    //     </div>
    //   </div>
    // </div>
    <div className="wc">
      <header className="wc-header">
        <h1>{org} Coordination</h1>
      </header>
      <div className="wc-container">
        <div className="wc-container-top">
          <AgendaCopy />
        </div>
        <div className="wc-container-left">
          <h2>Assignments</h2>
          <Tasks />
          {/* Tasks Load here */}
        </div>
        <div className="wc-container-right">
          <h2>Notes</h2>
          <NotesCopy />
          {/* Notes load here */}
        </div>
      </div>
    </div>
  );
}
