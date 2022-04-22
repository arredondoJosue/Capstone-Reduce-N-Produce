import React from "react";

export default function Agenda() {
  return (
    <div className="org-agenda-container">
      {/* <h1>Organization.name</h1>
      <p>
        The Organization page is where you can view and edit your organization's
        information.
      </p> */}
      {/* <h2>Meeting Agenda</h2> */}
      <textarea className="org-agenda-textarea" placeholder="Agenda" />
    </div>
  );
}
