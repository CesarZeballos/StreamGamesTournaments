"use client";
import React from "react";
import GamesFilters from "./GamesFilters";
import { IGame, IGamesFilters } from "@/interfaces/interfaceTournaments";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface GamesListProps {
  games: IGame[];
  filters: IGamesFilters;
  onFilter: (filters: IGamesFilters) => void;
  onDeactivateGame: (id: string) => void;
  onReactivateGame: (id: string) => void;
}

const GamesList: React.FC<GamesListProps> = ({
  games,
  filters,
  onFilter,
  onDeactivateGame,
  onReactivateGame,
}) => {
  const filteredGames = games.filter((game) => {
    const stateMatch =
      filters.state === "all" || // Muestra todos los juegos
      (filters.state === "active" && game.state) || // Muestra solo juegos activos
      (filters.state === "inactive" && !game.state); // Muestra solo juegos inactivos

    return stateMatch;
  });

  const sortedGames = filteredGames.sort((a, b) => {
    if (filters.name === "asc") {
      return a.name.localeCompare(b.name);
    } else if (filters.name === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div>
      <table className="w-full">
        <thead className="tableHeader flex flex-row justify-around">
          <th className="text-center w-36">Name</th>
          <th className="text-center w-36">State</th>
          <th className="text-center w-36">Ban Game</th>
        </thead>
        <GamesFilters onFilter={onFilter} />
        <tbody className="tableBody flex flex-col gap-2">
          {sortedGames.map((game) => (
            <tr className="flex flex-row justify-around" key={game.id}>
              <td className="text-center w-36">{game.name}</td>
              <td className="text-center w-36">
                {game.state ? "Active" : "Inactive"}
              </td>
              <td className="text-center w-36">
                {game.state ? (
                  <button
                    className="iconButton"
                    onClick={() => onDeactivateGame(game.id)}
                  >
                    <BlockIcon />
                  </button>
                ) : (
                  <button
                    className="iconButton"
                    onClick={() => onReactivateGame(game.id)}
                  >
                    <CheckCircleIcon />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GamesList;
