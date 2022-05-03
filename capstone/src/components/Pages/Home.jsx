import React, { useState, useEffect } from "react";
import axios from "axios";
import Notes from "../Widgets/Notes";
import Tasks from "../Widgets/Tasks";
import Inbox from "../Widgets/Inbox";
import useAxios from "../../Hooks/hooks";
import { useSelector } from "react-redux";

export default function Home() {
  // const data = useAxios("test", "get");
  // console.log(data);
  // let [user, setUser] = useState([]);
  const userInfo = useSelector((state) => state.globalStore.userInfo);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/v1/user").then((res) => {
  //     setUser(res.data[0]);
  //     console.log(user[0]);
  //   });
  // }, []);

  console.log(userInfo);

  return (
    <div className="home">
      <h1>Welcome, {userInfo.first_name}</h1>
      <div className="dashboard-container">
        {/* <h2>My Tasks</h2> */}
        <div className="section1">
          <h3>OverDue: {"tasks.length"}</h3>
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
