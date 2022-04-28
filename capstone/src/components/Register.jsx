import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseConfig from "../Hooks/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import "../App";
import Login from "./Login";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account Created");
        setUser(userCredential.user.email);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPwd("");
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
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
