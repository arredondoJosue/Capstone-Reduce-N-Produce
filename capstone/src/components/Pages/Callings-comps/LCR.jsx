import { useState, useEffect } from "react";
import axios from "axios";
import KanbanCard from "../../KanbanCard";

export default function LCR() {
  let [lcr, setLCR] = useState([]);
  let [state, setState] = useState(false);
  let [needUpdatedCount, setNeedUpdatedCount] = useState(0);
  let [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/proposed-callings/lcr")
      .then((res) => {
        setLCR(res.data);
        console.log(lcr);
        setState(true);
        console.log(state);
        setNeedUpdatedCount(
          lcr.filter((calling) => calling.proposed_status === "Need Update")
            .length
        );
        setUpdateCount(
          lcr.filter((calling) => calling.proposed_status === "Updated").length
        );
      });
    // .then(() => {

    // });
  }, []);

  const needUpdated = lcr.map((calling) => {
    if (calling.proposed_status === "Need Update") {
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

  const updated = lcr.map((calling) => {
    if (calling.proposed_status === "Updated") {
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
        <h3>Need Updated({state ? needUpdatedCount : "..."})</h3>
        <div className="kanban-container">
          {state ? needUpdated : <h1>Loading...</h1>}
        </div>
      </div>

      <div className="approved">
        <h3>Updated in LCR({state ? updateCount : "..."})</h3>
        <div className="kanban-container approved">
          {state ? updated : <h1>Loading...</h1>}
        </div>
      </div>
    </>
  );
}
