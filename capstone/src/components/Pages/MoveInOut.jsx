import React from "react";
import "../../styles/MoveInOut.scss";
import InfoCard from "../InfoCard";

export default function MoveInOut() {
  return (
    <div className="move">
      <header className="move-header">
        <h2>Move In/Out</h2>
      </header>
      <div className="move-container">
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </div>
    </div>
  );
}
