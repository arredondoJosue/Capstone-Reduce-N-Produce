import React from "react";
import KanbanCard from "../../KanbanCard";

export default function SustainSetApart() {
  return (
    <>
      <div className="new">
        <h3>Sustained(#)</h3>
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
        <h3>Set Apart(#)</h3>
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
