import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks } from "../Hooks/userSlice";
import ClickAwayListener from "react-click-away-listener";

import NewTask from "./NewTask";
import NewNote from "./NewNote";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// import { useAuth } from "./Hooks/hooks";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Navbar() {
  const [actionItem, setActionItem] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [show, setShow] = useState(true);
  // console.log("outside", show);

  const handleClose = () => {
    // console.log("inside", show);
    show ? setShow(false) : null;
    showNote ? setShowNote(false) : null;
    showTask ? setShowTask(false) : null;
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const iconStyle = {
    color: "white",
    fontSize: "1.5rem",
    marginRight: "1rem",
    listStyle: "none",
    textDecoration: "none",
  };

  // const popoverContainer = {
  //   postition: "absolute !important",
  //   top: "-65px !important",
  //   left: "55px !important",
  //   right: "auto !important",
  //   bottom: "65px !important",
  //   transform: "translate3d(5px, 64.5px, 0px) !important",
  //   maxHeight: "100vh !important",
  // };

  const popoverNote = (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <div id="popover-basic">
          <h3 className="popover-header">Add New Note</h3>
          <div className="popover-body">
            <NewNote handleClose={handleClose} />
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );

  const popover = (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <div id="popover-basic">
          <h3 className="popover-header">Add New Task</h3>
          <div className="popover-body">
            <NewTask handleClose={handleClose} />
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );

  const handleClickTask = () => {
    // show === null ? setShow(false) : setShow(true);
    show ? null : setShow(!show);
    setShowTask(!showTask);
    showNote ? setShowNote(false) : null;
  };

  const handleClickNote = () => {
    // show === null ? setShow(false) : setShow(true);
    show ? setShow(!show) : null;
    showTask ? setShowTask(false) : null;
    showNote ? setShowNote(false) : setShowNote(true);
  };

  return (
    <>
      <nav className="navbar action-items">
        <ul className="nav-list">
          <li className="navbar-li-items">
            {show ? (showTask ? popover : null) : null}
            <span
              className="material-icons action addTask"
              style={iconStyle}
              onClick={handleClickTask}
            >
              add_task
            </span>
          </li>
          <li className="navbar-li-items">
            {show ? null : showNote ? popoverNote : null}
            <span
              className="material-icons action"
              style={iconStyle}
              onClick={handleClickNote}
            >
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
  );
}
