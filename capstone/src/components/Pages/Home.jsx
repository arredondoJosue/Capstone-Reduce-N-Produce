import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "../Widgets/Notes";
import NotesCopy from "../Widgets/Notes copy";
import Tasks from "../Widgets/Tasks";
import Inbox from "../Widgets/Inbox";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "../../Hooks/userSlice";
import { setNotes } from "../../Hooks/userSlice";
// import { setInbox } from "../../Hooks/userSlice";

export default function Home() {
  // const data = useAxios("test", "get");
  // console.log(data);
  // let [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const userInfo = useSelector((state) => state.globalStore.userInfo);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/v1/user").then((res) => {
  //     setUser(res.data[0]);
  //     console.log(user[0]);
  //   });
  // }, []);

  return (
    // <div className="home">
    //   <h1>Welcome, {userInfo.first_name}</h1>
    //   <div className="dashboard-container">
    //     {/* <h2>My Tasks</h2> */}
    //     <div className="section1">
    //       <h3>My Tasks: </h3>
    //       {userInfo ? <Tasks /> : <h1>Loading...</h1>}
    //       <h3>Today: </h3>
    //       {/* <Tasks /> */}
    //       <h1 style={{ color: "grey" }}>Feature Coming Soon!</h1>

    //       <h3>Upcoming: </h3>
    //       {/* <Tasks /> */}
    //       <h1 style={{ color: "grey" }}>Feature Coming Soon!</h1>
    //     </div>

    //     <div className="section2">
    //       <h3>My Notes</h3>
    //       <Notes />
    //     </div>

    //     <div className="section3">
    //       <h3>Inbox</h3>
    //       {/* <Inbox /> */}
    //       <h1 style={{ color: "grey" }}>Feature Coming Soon!</h1>
    //     </div>
    //   </div>
    // </div>
    <div className="wc">
      <header className="wc-header">
        <h1>Welcome, {userInfo.first_name}</h1>
      </header>
      <div className="wc-container">
        <div className="wc-container-top">
          <h3>Inbox</h3>
          <h1 style={{ color: "grey" }}>Feature Coming Soon!</h1>
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
