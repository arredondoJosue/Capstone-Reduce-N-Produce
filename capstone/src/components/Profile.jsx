import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";

import EditProfile from "./EditProfile";
import ProfileInfo from "./ProfileInfo";
import "../styles/Profile.scss";

export default function Profile() {
  // const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  // const newSubs = approval.map((calling) => {
  //   if (calling.proposed_status === "New") {
  //     return (
  //       <KanbanCard
  //         key={calling.proposed_id}
  //         callingName={calling.proposed_calling}
  //         name={calling.proposed_name}
  //         release={calling.proposed_release_name}
  //         due={calling.proposed_needed_date}
  //         phase={calling.proposed_phase}
  //         status={calling.proposed_status}
  //       />
  //     );
  //   }
  // });

  return (
    <div className="profile">
      {/* <header className="profile-container">
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
      </header> */}
      <Routes>
        <Route path="/" element={<ProfileInfo />} />
        <Route path="/edit-user" element={<EditProfile />} />
      </Routes>

      {/* <div className="profile-container">
        <div className="profile-container-section1">
          <span className="profile-avatar">PVW</span>
        </div>
        <div className="profile-container-section2">
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
        </div>
      </div> */}
      {/* <span className="profile-avatar-color">
        Change Avatar Color:{" "}
        <select
          onChange={(e) => console.log("color changed to: ", e.target.value)}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
          <option value="pink">Pink</option>
          <option value="black">Black</option>
        </select>
      </span> */}
      {/* <span className="profile-notifications">
        <input type="checkbox" />
        <span className="profile-notifications-text">
          Receive notifications
        </span>
      </span> */}
    </div>
  );
}
