import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const navigate = useNavigate();
  // let [user, setUser] = useState([]);
  let [state, setState] = useState(true);
  const user = useSelector((state) => state.globalStore.userInfo);

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
            {state ? user.user_initials : ""}
          </span>
        </div>
        <div className="profile-container-section2">
          <div className="profile-name-container">
            <span className="profile-name">
              Name:{" "}
              <input
                type="text"
                className="profile-name-text input-group-text"
                placeholder={user.user_name}
                // style={{ backgroundColor: "rgba(115, 173, 215, 0.237)" }}
                style={{ color: "black" }}
              >
                {/* {state ? user.user_name : "Loading..."} */}
              </input>
            </span>
          </div>
          <div className="profile-name-container">
            <div className="profile-name">
              Email:{" "}
              <input
                type="email"
                placeholder={user.user_email}
                className="profile-name-text input-group-text"
                style={{ color: "black" }}
              >
                {/* {state ? user.user_email : "Loading..."} */}
              </input>
            </div>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Password:{" "}
              <input
                type="text"
                placeholder="************"
                className="profile-name-text input-group-text"
                style={{ color: "black" }}
              ></input>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Department:{" "}
              <input
                type="text"
                placeholder="Technology"
                className="profile-name-text input-group-text"
                style={{ color: "black" }}
              >
                {/* {state ? user.user_ward : "Loading..."} */}
              </input>
            </span>
          </div>
          <div className="profile-name-container">
            <span className="profile-name">
              Position:{" "}
              <input
                type="text"
                placeholder="Hacker"
                className="profile-name-text input-group-text"
                style={{ color: "black" }}
              >
                {/* {state ? user.user_calling : "Loading..."} */}
              </input>
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
            <button onClick={() => navigate("/profile")}>Save</button>
            <button onClick={() => navigate("/profile")}>Cancel</button>
          </span>
        </div>
      </header>

      {/* <span className="profile-avatar-color">
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
      </span> */}
    </>
  );
}
