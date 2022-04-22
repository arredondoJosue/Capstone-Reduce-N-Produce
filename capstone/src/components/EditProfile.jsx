import React from "react";
import "../styles/Profile.scss";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  return (
    <>
      <header className="profile-container">
        <div className="profile-container-section1">
          <span className="profile-avatar">JA</span>
        </div>
        <div className="profile-container-section2">
          <div className="profile-name-container">
            <span className="profile-name">
              Name: <span className="profile-name-text">user.name</span>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Email: <span className="profile-name-text">user.email</span>
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
