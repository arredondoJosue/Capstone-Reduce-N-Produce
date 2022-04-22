import React from "react";
import { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

export default function ProfileInfo() {
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
            <button onClick={() => navigate("/profile/edit-user")}>Edit</button>
          </span>
        </div>
      </header>
    </>
  );
}
