import { useState, useEffect } from "react";
import axios from "axios";
import KanbanCard from "../../KanbanCard";

export default function Contact() {
  let [contact, setContact] = useState([]);
  let [state, setState] = useState(false);
  let [contactedCount, setContactedCount] = useState(0);
  let [appointmentSetCount, setAppointmentSetCount] = useState(0);
  let [callingAcceptedCount, setCallingAcceptedCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/proposed-callings/contact")
      .then((res) => {
        setContact(res.data);
        console.log(contact);
        setState(true);
        console.log(state);
      });
  }, []);

  const contacted = contact.map((calling) => {
    if (calling.proposed_status === "Contacted") {
      return (
        <KanbanCard
          key={calling.proposed_id}
          callingName={calling.proposed_calling}
          name={calling.proposed_name}
          release={calling.proposed_release_name}
          due={calling.proposed_needed_date}
          phase={calling.proposed_phase}
          status={calling.proposed_status}
        />
      );
    }
  });

  const appointmentSet = contact.map((calling) => {
    if (calling.proposed_status === "Appt Set") {
      return (
        <KanbanCard
          key={calling.proposed_id}
          callingName={calling.proposed_calling}
          name={calling.proposed_name}
          release={calling.proposed_release_name}
          due={calling.proposed_needed_date}
          phase={calling.proposed_phase}
          status={calling.proposed_status}
        />
      );
    }
  });

  const callingAccepted = contact.map((calling) => {
    if (calling.proposed_status === "Calling Accepted") {
      return (
        <KanbanCard
          key={calling.proposed_id}
          callingName={calling.proposed_calling}
          name={calling.proposed_name}
          release={calling.proposed_release_name}
          due={calling.proposed_needed_date}
          phase={calling.proposed_phase}
          status={calling.proposed_status}
        />
      );
    }
  });

  const pending = contact.map((calling) => {
    if (calling.proposed_status === "Pending") {
      return (
        <KanbanCard
          key={calling.proposed_id}
          callingName={calling.proposed_calling}
          name={calling.proposed_name}
          release={calling.proposed_release_name}
          due={calling.proposed_needed_date}
          phase={calling.proposed_phase}
          status={calling.proposed_status}
        />
      );
    }
  });

  return (
    <>
      <div className="new">
        <h3>Contacted</h3>
        <div className="kanban-container">
          {state ? contacted : <h1>Loading...</h1>}
        </div>
      </div>

      <div className="approved">
        <h3>Appointment Set</h3>
        <div className="kanban-container approved">
          {state ? appointmentSet : <h1>Loading...</h1>}
        </div>
      </div>

      <div className="denied">
        <h3>Calling Accepted</h3>
        <div className="kanban-container rejected">
          {state ? callingAccepted : <h1>Loading...</h1>}
        </div>
      </div>

      <div className="pending">
        <h3>Pending</h3>
        <div className="kanban-container pending">
          {state ? pending : <h1>Loading...</h1>}
        </div>
      </div>
    </>
  );
}
