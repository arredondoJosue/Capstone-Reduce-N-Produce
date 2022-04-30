import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";

import NewTask from "./NewTask";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// import { useAuth } from "./Hooks/hooks";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Navbar() {
  const [actionItem, setActionItem] = useState(false);

  const navigate = useNavigate();
  const iconStyle = {
    color: "white",
    fontSize: "1.5rem",
    marginRight: "1rem",
    listStyle: "none",
    textDecoration: "none",
  };

  function addTask() {
    setActionItem(true);
    console.log("add task");
    setActionItem(false);
  }

  const popover = (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">Add New Task</PopoverHeader>
      <PopoverBody>
        <NewTask />
      </PopoverBody>
    </Popover>
  );

  return (
    <>
      <nav className="navbar action-items">
        <ul className="nav-list">
          <li className="navbar-li-items">
            <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
              <span
                className="material-icons action addTask"
                style={iconStyle}
                onClick={addTask}
              >
                add_task
              </span>
            </OverlayTrigger>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons action" style={iconStyle}>
              note_add
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons action" style={iconStyle}>
              post_add
            </span>
          </li>
        </ul>
      </nav>
      <nav className="navbar main-nav">
        <ul className="nav-list">
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/home">
                home
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/org">
                meeting_room
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/move-in-out">
                holiday_village
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/callings">
                ring_volume
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/ward-council">
                groups
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/messaging">
                chat
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/edit-page">
                newspaper
              </Link>
            </span>
          </li>
          <li className="navbar-li-items">
            <span className="material-icons main-nav-icons">
              <Link style={iconStyle} to="/profile">
                account_circle
              </Link>
            </span>
          </li>
        </ul>
      </nav>
      <nav className="navbar logout">
        <ul className="nav-list">
          <li className="navbar-li-items">
            <span
              className="material-icons nav-footer-icons"
              // onClick={() =>
              //   signOut(auth)
              //     .then(() => {
              //       console.log("successfully logged out");
              //       navigate("/");
              //     })
              //     .catch((err) => console.log("DID NOT LOGOUT ", err))
              // }
              onClick={async () => {
                console.log(auth);
                try {
                  await signOut(auth);
                  console.log("successfully logged out", auth);
                  navigate("/");
                } catch (err) {
                  console.log("DID NOT LOGOUT ", err);
                }
              }}
            >
              <Link style={iconStyle} to="/">
                power_settings_new
              </Link>
            </span>
          </li>
        </ul>
      </nav>
    </>

    // THIS IS WITH THE NAVBAR WRAPPED IN A CONTAINER
    // <div className="navbar-container">
    //   <nav className="navbar action-items">
    //     <ul className="nav-list">
    //       <li className="navbar-li-items">
    //         <OverlayTrigger trigger="click" placement="auto" overlay={popover}>
    //           <span className="material-icons action" onClick={addTask}>
    //             add_task
    //           </span>
    //         </OverlayTrigger>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons action">note_add</span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons action">post_add</span>
    //       </li>
    //     </ul>
    //   </nav>
    //   <nav className="navbar main-nav">
    //     <ul className="nav-list">
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/home">home</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/org">meeting_room</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/move-in-out">holiday_village</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/callings">ring_volume</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/ward-council">groups</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/messaging">chat</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/edit-page">newspaper</Link>
    //         </span>
    //       </li>
    //       <li className="navbar-li-items">
    //         <span className="material-icons">
    //           <Link to="/profile">account_circle</Link>
    //         </span>
    //       </li>
    //     </ul>
    //   </nav>
    //   <nav className="navbar logout">
    //     <ul className="nav-list">
    //       <li className="navbar-li-items">
    //         <span
    //           className="material-icons"
    //           // onClick={() =>
    //           //   signOut(auth)
    //           //     .then(() => {
    //           //       console.log("successfully logged out");
    //           //       navigate("/");
    //           //     })
    //           //     .catch((err) => console.log("DID NOT LOGOUT ", err))
    //           // }
    //           onClick={async () => {
    //             console.log(auth);
    //             try {
    //               await signOut(auth);
    //               console.log("successfully logged out", auth);
    //               navigate("/");
    //             } catch (err) {
    //               console.log("DID NOT LOGOUT ", err);
    //             }
    //           }}
    //         >
    //           <Link to="/">power_settings_new</Link>
    //         </span>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
}
