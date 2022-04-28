import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import "../App";
import firebaseConfig from "../Hooks/firebase";
import Register from "./Register";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MEASSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Signed in");
        setUser(userCredential.user.email);
        setError(userCredential);
        setEmail("");
        setPassword("");
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // console.log(user);
  // console.log(error);

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
      {/* <Routes>
        <Route path="/register" element={<Register />} />
      </Routes> */}
    </div>
  );
}
