import React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "../App";
import Login from "./Login";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create Account</h1>
      <form className="form-container">
        <div className="form-section">
          <label>
            First Name:
            <input type="text" name="firstName" placeholder="First Name" />
          </label>

          <label>
            Last Name:
            <input type="text" name="lastName" placeholder="Last Name" />
          </label>
          <br />
        </div>

        <div className="form-section">
          <label className="form-label">
            Email:
            <input type="email" name="email" placeholder="Email" />
          </label>

          <label className="form-label">
            Password:
            <input type="password" name="password" placeholder="Password" />
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
            />
          </label>
          <br />
        </div>
        <input type="submit" value="Submit" onClick={() => navigate("/home")} />
      </form>
      <br />
      Already have an account?{" "}
      <Link to="/login" className="login-register">
        Login
      </Link>
    </div>
  );
}
