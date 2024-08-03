import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/slices/tournamentSlice";

//icons import
import { MdGames } from "react-icons/md";
import { SiLeagueoflegends } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex flex-row justify-center p-2 gap-6">
      <button className="buttonFilter" onClick={() => handleFilterClick("All Tournaments")}>
        <MdGames />
        <p>All Tournaments</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("CounterStrike Go")}>
        <SiCounterstrike />
        <p>Counter Strike</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("Fortnite")}>
        <TbBrandFortnite />
        <p>Fortnite</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("League of Legends")}>
        <SiLeagueoflegends />
        <p>League of Legends</p>
      </button>
    </div>
  );
};

export default SearchBar;
