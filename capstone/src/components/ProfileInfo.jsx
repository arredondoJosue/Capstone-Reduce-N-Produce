import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function ProfileInfo() {
  const navigate = useNavigate();
  let [user, setUser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/user").then((res) => {
      setUser(res.data[0]);
      console.log(user[0]);
    });
  }, []);

  return (
    <>
      <header className="profile-container">
        <div className="profile-container-section1">
          <span className="profile-avatar">{user.user_initials}</span>
        </div>
        <div className="profile-container-section2">
          <div className="profile-name-container">
            <span className="profile-name">
              Name: <span className="profile-name-text">{user.user_name}</span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Email:{" "}
              <span className="profile-name-text">{user.user_email}</span>
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
              Ward: <span className="profile-name-text">user.ward.name</span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Calling:{" "}
              <span className="profile-name-text">user.calling.name</span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Organization:{" "}
              <span className="profile-name-text">user.organization.name</span>
            </span>
          </div>
          <span className="profile-edit-button">
            <button onClick={() => navigate("/profile/edit-user")}>Edit</button>
          </span>
        </div>
      </header>
    </>
  );
}
