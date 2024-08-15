"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { filterEmun } from "@/interfaces/interfaceRedux";
import { filtered, getGamesActivesSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { IGame } from "@/interfaces/interfaceTournaments";

// Icons import
import { SiLeagueoflegends, SiCounterstrike, SiPubg, SiValorant } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";

// Icon mapping
const iconMap: { [key: string]: JSX.Element } = {
  "League of Legends": <SiLeagueoflegends />,
  "CounterStrike Go": <SiCounterstrike />,
  "Fortnite": <TbBrandFortnite />,
  "PUBG": <SiPubg />,
  "Valorant": <SiValorant />,
};

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.tournament.filters.game);
  const games = useSelector((state: RootState) => state.tournament.games);
  const [banner, setBanner] = useState<IGame[]>([]);

  useEffect(() => {
    if (games.length === 0) {
      dispatch(getGamesActivesSlice());
    }
  }, []);

  useEffect(() => {
    setBanner(games);
  }, [games]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    dispatch(filtered({
      name: name as filterEmun,
      value: value
    }));
  };

  return (
    <div className="flex flex-row justify-center p-2 gap-6">
      {banner.map(game => (
        <button
          key={game.id}
          className={`buttonFilter ${filters === game.name && "buttonFilterActive"}`}
          name="game"
          value={game.name}
          onClick={handleFilterClick}
        >
          {iconMap[game.name] || <SiLeagueoflegends />} {/* Default icon if no match */}
          <p>{game.name}</p>
        </button>
      ))}
    </div>
  );
};

export default SearchBar;