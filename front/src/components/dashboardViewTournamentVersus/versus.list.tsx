import React from 'react';
import { Versus } from './versus.type';
import VersusItem from './versus.item';

interface VersusListProps {
  versus: Versus[];
  onWinnerSelect: (versusId: string, winnerId: string) => void;
}

const VersusList: React.FC<VersusListProps> = ({ versus, onWinnerSelect }) => {
  return (
    <div>
      {versus.map((battle) => (
        <VersusItem
          key={battle.id}
          team1={battle.team1}
          team2={battle.team2}
          onWinnerSelect={(winnerId) => onWinnerSelect(battle.id, winnerId)}
        />
      ))}
    </div>
  );
};

export default VersusList;
