import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileInfo() {
  const navigate = useNavigate();
  // let [user, setUser] = useState([]);
  let [state, setState] = useState(true);
  const userInfo = useSelector((state) => state.globalStore.userInfo);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/v1/user").then((res) => {
  //     setUser(res.data[0]);
  //     console.log(user[0]);
  //     setState(true);
  //   });
  // }, []);

  return (
    <>
      <header className="profile-container">
        <div className="profile-container-section1">
          <span className="profile-avatar">
            {state ? userInfo.user_initials : ""}
          </span>
        </div>
        <div className="profile-container-section2">
          <div className="profile-name-container">
            <span className="profile-name">
              Name:{" "}
              <span className="profile-name-text">
                {state ? userInfo.user_name : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Email:{" "}
              <span className="profile-name-text">
                {state ? userInfo.user_email : "Loading..."}
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
                {state ? userInfo.user_ward : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Calling:{" "}
              <span className="profile-name-text">
                {state ? userInfo.user_calling : "Loading..."}
              </span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Organization:{" "}
              <span className="profile-name-text">
                {state ? userInfo.user_org : "Loading..."}
              </span>
            </span>
          </div>
          <span className="profile-edit-button-text">
            <button
              className="profile-edit-button"
              onClick={() => navigate("/profile/edit-user")}
            >
              Edit
            </button>
          </span>
        </div>
      </header>
    </>
  );
}
