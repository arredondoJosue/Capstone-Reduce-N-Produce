import React from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Approval from "./Callings-comps/Approval";
import Contact from "./Callings-comps/Contact";
import SustainSetApart from "./Callings-comps/SustainSetApart";
import LCR from "./Callings-comps/LCR";

export default function Callings() {
  const navigate = useNavigate();
  return (
    <div className="callings">
      <header className="callings-header">
        <h1>Callings</h1>

        <nav className="callings-nav">
          <select
            onChange={(e) => navigate(`/callings/${e.target.value}`)}
            className="callings-nav-selection"
          >
            <option value="">--Select Phase--</option>
            <option value="approval">1. Approval</option>
            <option value="contact">2. Contact</option>
            <option value="sustain-set">3. Sustain & Set Apart</option>
            <option value="lcr">4. LCR</option>
          </select>
        </nav>
      </header>
      <div className="callings-container">
        <Routes>
          <Route path="approval" element={<Approval />} />
          <Route path="contact" element={<Contact />} />
          <Route path="sustain-set" element={<SustainSetApart />} />
          <Route path="lcr" element={<LCR />} />
        </Routes>
      </div>
    </div>
  );
}
