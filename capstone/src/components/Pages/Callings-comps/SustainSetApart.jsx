import { useState, useEffect } from "react";
import axios from "axios";
import KanbanCard from "../../KanbanCard";

export default function SustainSetApart() {
  let [sustain, setSustain] = useState([]);
  let [state, setState] = useState(false);
  let [sustainCount, setSustainCount] = useState(0);
  let [setApartCount, setSetApartCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/proposed-callings/sustain-set-apart")
      .then((res) => {
        setSustain(res.data);
        console.log(sustain);
        setState(true);
        console.log(state);
        setSustainCount(
          sustain.filter((calling) => calling.proposed_status === "Sustained")
            .length
        );
        setSetApartCount(
          sustain.filter((calling) => calling.proposed_status === "Set Apart")
            .length
        );
      });
  }, []);

  const sustained = sustain.map((calling) => {
    if (calling.proposed_status === "Sustained") {
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

  const setApart = sustain.map((calling) => {
    if (calling.proposed_status === "Set Apart") {
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
        {/* <h3>Sustained({state ? sustainCount : "..."})</h3> */}
        <h3>Sustained</h3>
        <div className="kanban-container">
          {state ? sustained : <h1>Loading...</h1>}
        </div>
      </div>

      <div className="approved">
        <h3>Set Apart</h3>
        <div className="kanban-container approved">
          {state ? setApart : <h1>Loading...</h1>}
        </div>
      </div>

      {/* <div className="pending">
        <h3>Pending(#)</h3>
        <div className="kanban-container pending">
          <KanbanCard />
          <KanbanCard />
        </div>
      </div> */}
    </>
  );
}
