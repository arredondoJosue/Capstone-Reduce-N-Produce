import { Routes, Route } from "react-router-dom";

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
import NewTask from "./components/NewTask";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
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
          <Route path="/register" element={<Register />} />
          <Route path="/new-task" element={<NewTask />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
