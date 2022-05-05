import { useEffect, useState } from "react";
import axios from "axios";
import KanbanCard from "../../KanbanCard";
import LoadingIcon from "../../Widgets/LoadingIcon";

export default function Approval() {
  let [approval, setApproval] = useState([]);
  let [state, setState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/proposed-callings/approval")
      .then((res) => {
        setApproval(res.data);
        console.log(approval);
        setState(true);
        console.log(state);
      });
  }, []);

  const newSubs = approval.map((calling) => {
    if (calling.proposed_status === "New") {
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

  const approvedSubs = approval.map((calling) => {
    if (calling.proposed_status === "Approved") {
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

  const deniedSubs = approval.map((calling) => {
    if (calling.proposed_status === "Denied") {
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

  const pendingSubs = approval.map((calling) => {
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
      {/* {state ? (
        <> */}
      <div className="new">
        <h3>New</h3>
        <div className="kanban-container">
          {state ? newSubs : <h1>Loading...</h1>}
          {/* <KanbanCard
            key={approval[0].proposed_id}
            callingName={approval[0].proposed_calling}
            name={approval[0].proposed_name}
            release={approval[0].proposed_release_name}
            due={approval[0].proposed_needed_date}
            phase={approval[0].proposed_phase}
            status={approval[0].proposed_status}
          /> */}
          {/* <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard /> */}
        </div>
      </div>

      <div className="approved">
        <h3>Approved</h3>
        <div className="kanban-container approved">
          {state ? approvedSubs : <h1>Loading...</h1>}
          {/* <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard /> */}
        </div>
      </div>

      <div className="denied">
        <h3>Denied</h3>
        <div className="kanban-container rejected">
          {state ? deniedSubs : <h1>Loading...</h1>}
          {/* <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard /> */}
        </div>
      </div>

      <div className="pending">
        <h3>Pending</h3>
        <div className="kanban-container pending">
          {state ? pendingSubs : <h1>Loading...</h1>}
          {/* <KanbanCard />
          <KanbanCard /> */}
        </div>
      </div>
    </>
    // ) : (
    //   <div className="callings-loading">
    //     <LoadingIcon />
    //   </div>
    // )}
    // </>
  );
}
