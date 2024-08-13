import React from 'react';
import { Team } from './versus.type';

interface VersusItemProps {
  team1: Team;
  team2: Team;
  onWinnerSelect: (winnerId: string) => void;
}

const VersusItem: React.FC<VersusItemProps> = ({ team1, team2, onWinnerSelect }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0' }}>
      <div>
        <button onClick={() => onWinnerSelect(team1.id)}>Winner</button>
        <div>{team1.name}</div>
      </div>
      <div>
        <button onClick={() => onWinnerSelect(team2.id)}>Winner</button>
        <div>{team2.name}</div>
      </div>
    </div>
  );
};

export default VersusItem;
