import React from "react";

export default function InfoCard() {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <h3 className="info-card-title">Long Proposed Calling Name</h3>
      </div>
      <div className="info-card-body">
        <div className="info-card-body-subcontainer">
          <div className="info-card-body-subcontainer-header">
            <div>
              <h4>Proposed </h4> <h5>John Smith</h5>
            </div>
            <div>
              <h4>Release </h4> <h5>Jacob Smith</h5>
            </div>
            <div>
              <h4>Needed By </h4> <h5>05/04</h5>
            </div>
            <div>
              <h4>Team </h4> <h5>RS</h5>
            </div>
          </div>
          {/* <div className="kanban-card-body-subcontainer-body">
            <select>
              <option value="">Select a status</option>
              <option value="new">New</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}
