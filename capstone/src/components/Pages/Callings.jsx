// import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import LoadingIcon from "../Widgets/LoadingIcon";
import axios from "axios";

import Approval from "./Callings-comps/Approval";
import Contact from "./Callings-comps/Contact";
import SustainSetApart from "./Callings-comps/SustainSetApart";
import LCR from "./Callings-comps/LCR";

export default function Callings() {
  let [callings, setCallings] = useState([]);
  let [approval, setApproval] = useState([]);
  let [contact, setContact] = useState([]);
  let [sustainSetApart, setSustainSetApart] = useState([]);
  let [lcr, setLCR] = useState([]);

  const navigate = useNavigate();
  // const CallingsContext = createContext(callings);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/v1/proposed-callings")
  //     .then((res) => {
  //       setCallings(res.data);
  //       console.log(callings);
  //     })
  //     .then(() => {
  //       axios
  //         .get("http://localhost:5000/api/v1/proposed-callings/approval")
  //         .then((res) => {
  //           setApproval(res.data);
  //           console.log(approval);
  //         });
  //     })
  //     .then(() => {
  //       axios
  //         .get("http://localhost:5000/api/v1/proposed-callings/contact")
  //         .then((res) => {
  //           setContact(res.data);
  //           console.log(contact);
  //         });
  //     })
  //     .then(() => {
  //       axios
  //         .get(
  //           "http://localhost:5000/api/v1/proposed-callings/sustain-set-apart"
  //         )
  //         .then((res) => {
  //           setSustainSetApart(res.data);
  //           console.log(sustainSetApart);
  //         });
  //     })
  //     .then(() => {
  //       axios
  //         .get("http://localhost:5000/api/v1/proposed-callings/lcr")
  //         .then((res) => {
  //           setLCR(res.data);
  //           console.log(lcr);
  //         });
  //     });
  //   // .then(() => {
  //   //   if (callings.proposed_phase === "Approval") {
  //   //     setApproval(
  //   //       callings.filter(
  //   //         (callings) => callings.proposed_phase === "Approval"
  //   //       )
  //   //     );
  //   //   } else if (callings.proposed_phase === "Contact") {
  //   //     setContact(
  //   //       callings.filter((callings) => callings.proposed_phase === "Contact")
  //   //     );
  //   //   } else if (callings.proposed_phase === "Sustain Set Apart") {
  //   //     setSustainSetApart(
  //   //       callings.filter(
  //   //         (callings) => callings.proposed_phase === "Sustain Set Apart"
  //   //       )
  //   //     );
  //   //   } else if (callings.proposed_phase === "LCR") {
  //   //     setLCR(
  //   //       callings.filter((callings) => callings.proposed_phase === "LCR")
  //   //     );
  //   //   }
  //   //   console.log("APPROVAL ", approval);
  //   //   console.log("CONTACT ", contact);
  //   //   console.log("SUSTAIN ", sustainSetApart);
  //   //   console.log("LCR ", lcr);
  //   // });
  // }, []);

  // let callingsList = callings.map((calling) => {
  //   return (
  //     <div className="child-widget-subcontainer">
  //       <input type="checkbox" />
  //       <div>{calling.proposed_calling}</div>
  //       <div>{calling.proposed_name}</div>
  //       <div>{calling.proposed_release_name}</div>
  //       <div>{calling.proposed_needed_date}</div>
  //       <div>{calling.proposed_phase}</div>
  //       <div>{calling.proposed_staus}</div>
  //     </div>
  //   );
  // });

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
          <Route path="approval" element={<Approval approval={approval} />} />
          <Route path="contact" element={<Contact contact={contact} />} />
          <Route
            path="sustain-set"
            element={<SustainSetApart sustainSetApart={sustainSetApart} />}
          />
          <Route path="lcr" element={<LCR lcr={lcr} />} />
        </Routes>
      </div>
    </div>
  );
}
