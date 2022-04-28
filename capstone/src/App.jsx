import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import useAxios from "./Hooks/hooks";

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

function App() {
  // const data = useAxios("test");
  // console.log(data);
  // const seedData = useAxios("seed");

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <button onClick={seedData}>Seed</button>
        <div>{data}</div>
        <div>{seedData}</div> */}
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/org" element={<Org />} />
          <Route path="/move-in-out" element={<MoveInOut />} />
          <Route path="/callings/*" element={<Callings />} />
          <Route path="/ward-council" element={<WardCouncil />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/edit-page" element={<EditPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
