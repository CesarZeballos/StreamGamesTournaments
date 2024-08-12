"use client";
import React from 'react';
import GamesFilters from './GamesFilters';
import { IGame , IGamesFilters } from '@/interfaces/interfaceTournaments';
import BlockIcon from '@mui/icons-material/Block';

interface GamesListProps {
  games: IGame[];
  filters: IGamesFilters;
  onFilter: (filters: IGamesFilters) => void;
  onDeactivateGame: (id: string) => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, filters, onFilter, onDeactivateGame }) => {
  const filteredGames = games
    .filter(game => 
      filters.state === '' || 
      filters.state === undefined || 
      game.state === (filters.state === 'true')
    );

  const sortedGames = filteredGames.sort((a, b) => {
    if (filters.name === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (filters.name === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div>
      <table className='w-full'>
        <thead className='tableHeader flex flex-row justify-around'>
            <th className='text-center w-36'>Name</th>
            <th className='text-center w-36'>State</th>
            <th className='text-center w-36'>Ban Game</th>
        </thead>
          <GamesFilters onFilter={onFilter} />
        <tbody className="tableBody flex flex-col gap-2">
          {sortedGames.map(game => (
            <tr className="flex flex-row justify-around" key={game.id}>
              <td className='text-center w-36'>{game.name}</td>
              <td className='text-center w-36'>{game.state ? 'Active' : 'Inactive'}</td>
              <td className='text-center w-36'>
                <button className='iconButton' onClick={() => onDeactivateGame(game.id)}><BlockIcon />  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesList;