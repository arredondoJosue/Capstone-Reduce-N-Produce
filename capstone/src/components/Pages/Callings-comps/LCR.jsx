import React from "react";
import KanbanCard from "../../KanbanCard";

export default function LCR() {
  return (
    <>
      <div className="new">
        <h3>Need Update(#)</h3>
        <div className="kanban-container">
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
        </div>
      </div>

      <div className="approved">
        <h3>Updated in LCR(#)</h3>
        <div className="kanban-container approved">
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
        </div>
      </div>

      <div className="denied">
        <h3>Denied(#)</h3>
        <div className="kanban-container rejected">
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
        </div>
      </div>

      <div className="pending">
        <h3>Pending(#)</h3>
        <div className="kanban-container pending">
          <KanbanCard />
          <KanbanCard />
        </div>
      </div>
    </>
  );
}
