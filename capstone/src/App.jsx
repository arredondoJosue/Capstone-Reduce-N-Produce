import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// import "./App.css";
import "./App.scss";
import "./styles/Register.scss";
import "./styles/Widgets.scss";
import "./styles/Callings.scss";

import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Profile from "./components/Profile";
import Org from "./components/Pages/Org";
import MoveInOut from "./components/Pages/MoveInOut";
import Callings from "./components/Pages/Callings";
import WardCouncil from "./components/Pages/WardCouncil";
import Messaging from "./components/Pages/Messaging";
import EditPage from "./components/Pages/EditPage";
import Login from "./components/Login";
import Register from "./components/Register";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        {/* <Login /> */}
        {/* <Register /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/org" element={<Org />} />
          <Route path="/move-in-out" element={<MoveInOut />} />
          <Route path="/callings/*" element={<Callings />} />
          <Route path="/ward-council" element={<WardCouncil />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/edit-page" element={<EditPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
