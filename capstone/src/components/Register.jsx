import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import "../App";
// import Login from "./Login";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [calling, setCalling] = useState("");
  const [org, setOrg] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account Created");
        console.log(userCredential.user.uid);
        setUser(userCredential.user.uid);

        axios
          .post(
            `http://localhost:5000/api/v1/user/register/${userCredential.user.uid}`,
            {
              firstName,
              lastName,
              email,
              calling,
              org,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            setError(err.message);
          });
      })
      .then(() => {
        console.log("User Created");
        setSuccess(
          "Account Created, you will now be re-directed to the login page."
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPwd("");
        setCalling("");
        setOrg("");
        setLoading(true);
        // setFirstName("");
        // setLastName("");
        // setEmail("");
        // setPassword("");
        // setConfirmPwd("");
        // setOrg("");
        // setCalling("");
        // setSuccess("Account Created");
        // setLoading(false);
        setError("");
        setTimeout(() => {
          navigate("/");
        }, 3000);

        // navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setSuccess("");
        setLoading(false);
      });
  };

  return loading ? (
    <h1>{success}</h1>
  ) : (
    <div>
      <h1>Create Account</h1>
      <form className="form-container" onSubmit={registerUser}>
        <div className="form-section">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>

          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
          <br />

          <label>
            Calling:
            <select
              name="calling"
              onChange={(e) => setCalling(e.target.value)}
              value={calling}
            >
              <option value="">Select</option>
              <option value={1}>No Calling</option>
              <option value={2}>President</option>
              <option value={3}>Counselor</option>
              <option value={4}>Secretary</option>
            </select>
          </label>
          <label>
            Organization:
            <select
              name="org"
              placeholder="Organization"
              onChange={(e) => setOrg(e.target.value)}
              value={org}
            >
              <option value="">Select</option>
              <option value={1}>Bishopric</option>
              <option value={2}>Elder's Quorum</option>
              <option value={3}>Relief Society</option>
              <option value={4}>Primary</option>
            </select>
          </label>
          <br />
        </div>

        <div className="form-section">
          <label className="form-label">
            Email:
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPwd(e.target.value)}
              value={confirmPwd}
            />
          </label>
          <br />
        </div>
        <input type="submit" value="Submit" />
      </form>
      <br />
      Already have an account?{" "}
      <Link to="/login" className="login-register">
        Login
      </Link>
    </div>
  );
}
