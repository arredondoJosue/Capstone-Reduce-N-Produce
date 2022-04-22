import React from "react";
import Notes from "../Widgets/Notes";
import Tasks from "../Widgets/Tasks";
import Inbox from "../Widgets/Inbox";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome, user.name</h1>
      <div className="dashboard-container">
        {/* <h2>My Tasks</h2> */}
        <div className="section1">
          <h3>OverDue: {"#"}</h3>
          <Tasks />
          <h3>Today: {"#"}</h3>
          <Tasks />
          <h3>Upcoming: {"#"}</h3>
          <Tasks />
        </div>

        <div className="section2">
          <h3>My Notes</h3>
          <Notes />
        </div>

        <div className="section3">
          <h3>Inbox</h3>
          <Inbox />
        </div>
      </div>
    </div>
  );
}
