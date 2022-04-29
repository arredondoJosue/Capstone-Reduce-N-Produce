import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.scss";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  let [user, setUser] = useState([]);
  let [state, setState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/user").then((res) => {
      setUser(res.data[0]);
      console.log(user[0]);
      setState(true);
    });
  }, []);
  return (
    <>
      <header className="profile-container">
        <div className="profile-container-section1">
          <span className="profile-avatar">
            {state ? user.user_initials : ""}
          </span>
        </div>
        <div className="profile-container-section2">
          <div className="profile-name-container">
            <span className="profile-name">
              Name:{" "}
              <span className="profile-name-text">
                {state ? user.user_name : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Email:{" "}
              <span className="profile-name-text">
                {state ? user.user_email : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Password:
              <span className="profile-name-text"> ************</span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Ward:{" "}
              <span className="profile-name-text">
                {state ? user.user_ward : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Calling:{" "}
              <span className="profile-name-text">
                {" "}
                {state ? user.user_calling : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Organization:{" "}
              <span className="profile-name-text">
                {state ? user.user_org : "Loading..."}
              </span>
            </span>
          </div>
          <span className="profile-edit-button">
            <button>Save</button>
            <button onClick={() => navigate("/profile")}>Cancel</button>
          </span>
        </div>
      </header>

      <span className="profile-avatar-color">
        Change Avatar Color:{" "}
        <select>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="black">Black</option>
        </select>
      </span>

      <span className="profile-notifications">
        <input type="checkbox" />
        <span className="profile-notifications-text">
          Receive notifications
        </span>
      </span>
    </>
  );
}
