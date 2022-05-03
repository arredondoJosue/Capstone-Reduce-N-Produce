// import "../styles/BootCustom.scss";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTasks, setPopoverTask, setPopoverNote } from "../Hooks/userSlice";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";

import NewTask from "./NewTask";
import NewNote from "./NewNote";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// import { useAuth } from "./Hooks/hooks";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let useClickOutsideTask = (handler) => {
  let domNodeTask = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNodeTask.current && !!domNodeTask.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNodeTask;
};

let useClickOutsideNote = (handler) => {
  let domNodeNote = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (domNodeNote.current && !!domNodeNote.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNodeNote;
};

export default function Navbar() {
  const [actionItem, setActionItem] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const popTaskToggle = useSelector((state) => state.globalStore.popoverTask);
  const popNoteToggle = useSelector((state) => state.globalStore.popoverNote);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const iconStyle = {
    color: "white",
    fontSize: "1.5rem",
    marginRight: "1rem",
    listStyle: "none",
    textDecoration: "none",
  };

  const popoverContainer = {
    postition: "absolute !important",
    top: "-65px !important",
    left: "55px !important",
    right: "auto !important",
    bottom: "65px !important",
    transform: "translate3d(5px, 64.5px, 0px) !important",
    maxHeight: "100vh !important",
  };

  let domNode = useClickOutsideTask(() => setShowTask(false));
  let domNodeNote = useClickOutsideNote(() => setShowNote(false));

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (e) => {
  //   if (actionItem && !actionItem.contains(e.target)) {
  //     setActionItem(false);
  //   } else if (actionItem && actionItem.contains(e.target)) {
  //     setActionItem(actionItem);
  //   }
  // };

  // const popover = (
  //   <Popover id="popover-basic">
  //     <PopoverHeader as="h3">Add New Task</PopoverHeader>
  //     <PopoverBody>
  //       <NewTask handleShow={handleShow} />
  //     </PopoverBody>
  //   </Popover>
  // );

  // const popoverNote = (
  //   <Popover id="popover-basic">
  //     <PopoverHeader as="h3">Add New Note</PopoverHeader>
  //     <PopoverBody>
  //       <NewNote />
  //     </PopoverBody>
  //   </Popover>
  // );
  const popoverNote = (
    <div ref={domNodeNote} id="pop-click">
      <div id="popover-basic">
        <h3 className="popover-header">Add New Note</h3>
        <div className="popover-body">
          <NewNote />
        </div>
      </div>
    </div>
  );

  const popover = (
    <div ref={domNode} id="pop-click">
      <div id="popover-basic">
        <h3 className="popover-header">Add New Task</h3>
        <div className="popover-body">
          <NewTask />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="navbar action-items">
        <ul className="nav-list">
          <li className="navbar-li-items">
            {/* <OverlayTrigger
              rootClose
              trigger="click"
              placement="auto"
              overlay={popover}
              defaultShow={false}
            >
              <span className="material-icons action addTask" style={iconStyle}>
                add_task
              </span>
            </OverlayTrigger> */}
            {showTask ? popover : null}
            <span
              className="material-icons action addTask"
              style={iconStyle}
              onClick={() => setShowTask((show) => !show)}
            >
              add_task
            </span>
          </li>
          <li className="navbar-li-items">
            {showNote ? popoverNote : null}
            <span
              className="material-icons action"
              style={iconStyle}
              onClick={() => setShowNote((show) => !show)}
            >
              note_add
            </span>

            {/* <OverlayTrigger
              rootClose
              trigger="click"
              placement="auto"
              overlay={popoverNote}
            >
              <span className="material-icons action" style={iconStyle}>
                note_add
              </span>
            </OverlayTrigger> */}
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
