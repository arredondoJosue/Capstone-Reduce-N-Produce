import React, { useState } from "react";
import "../../styles/MoveInOut.scss";
import InfoCard from "../InfoCard";

export default function MoveInOut() {
  const [moves, setMoves] = useState([]);

  let moveInOut = moves.map((move) => {
    <InfoCard
      key={move.move_id}
      move_id={move.move_id}
      move_date={move.move_date}
      move_type={move.move_type}
      move_description={move.move_description}
      move_notes={move.move_notes}
    />;
  });

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
