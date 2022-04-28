import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// import { useAuth } from "./Hooks/hooks";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar action-items">
        <ul className="nav-list">
          <li>
            <span className="material-icons action">add_task</span>
          </li>
          <li>
            <span className="material-icons action">note_add</span>
          </li>
          <li>
            <span className="material-icons action">post_add</span>
          </li>
        </ul>
      </nav>
      <nav className="navbar main-nav">
        <ul className="nav-list">
          <li>
            <span className="material-icons">
              <Link to="/home">home</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/org">meeting_room</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/move-in-out">holiday_village</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/callings">ring_volume</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/ward-council">groups</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/messaging">chat</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/edit-page">newspaper</Link>
            </span>
          </li>
          <li>
            <span className="material-icons">
              <Link to="/profile">account_circle</Link>
            </span>
          </li>
        </ul>
      </nav>
      <nav className="navbar logout">
        <ul className="nav-list">
          <li>
            <span
              className="material-icons"
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
              <Link to="/">power_settings_new</Link>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
