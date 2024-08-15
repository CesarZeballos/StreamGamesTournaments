import React from "react";
import { useDispatch, useSelector } from "react-redux";

//icons import
import { SiLeagueoflegends } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";
import { AppDispatch, RootState } from "@/redux/store";
import { filterEmun } from "@/interfaces/interfaceRedux";
import { filtered } from "@/redux/thunks/auxiliarSliceThunk";


const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.tournament.filters.game)
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    dispatch(filtered({
      name: name as filterEmun,
      value: value
    }))
  };


  return (
    <div className="flex flex-row justify-center p-2 gap-6">
      <button className={`buttonFilter ${filters === "CounterStrike Go" && "buttonFilterActive"}`} 
      name="game" 
      value={"CounterStrike Go"} 
      onClick={handleFilterClick}>
        <SiCounterstrike />
        <p>Counter Strike</p>
      </button>
      <button className={`buttonFilter ${filters === "Fortnite" && "buttonFilterActive"}`} 
      name="game" 
      value={"Fortnite"} 
      onClick={handleFilterClick}>
        <TbBrandFortnite />
        <p>Fortnite</p>
      </button>
      <button className={`buttonFilter ${filters === "League of Legends" && "buttonFilterActive"}`} 
      name="game" 
      value={"League of Legends"} 
      onClick={handleFilterClick}>
        <SiLeagueoflegends />
        <p>League of Legends</p>
      </button>
    </div>
  );
};

export default SearchBar;
