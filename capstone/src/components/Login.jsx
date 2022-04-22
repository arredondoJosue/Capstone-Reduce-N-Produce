import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import "../App";
import Register from "./Register";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
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
