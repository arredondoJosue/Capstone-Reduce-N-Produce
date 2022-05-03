import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo, setAllUsers } from "../Hooks/userSlice";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import axios from "axios";
import "../App";
import firebaseConfig from "../Hooks/firebase";
import Register from "./Register";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      console.log("Signed in");

      axios
        .get(`http://localhost:5000/api/v1/user/${userCredential.user.uid}`)
        .then((res) => {
          dispatch(setUser(userCredential.user.uid));
          dispatch(setUserInfo(res.data[0]));
          setEmail("");
          setPassword("");
          axios
            .get("http://localhost:5000/api/v1/users")
            .then((response) => {
              console.log("hit all users fetch");
              console.log(response.data);
              dispatch(setAllUsers(response.data));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          setError(error.message);
        })
        .then(() => {
          navigate("/home");
          getAllUsers();
        });
    });
  };

  const getAllUsers = () => {};

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>Don't have an account?</h2>
      <Link to="/register" element={<Register />} className="login-register">
        Register
      </Link>
    </div>
  );
}
