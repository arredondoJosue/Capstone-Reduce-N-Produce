import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <span className="material-icons" onClick={() => navigate("/login")}>
              <Link to="/logout">power_settings_new</Link>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
