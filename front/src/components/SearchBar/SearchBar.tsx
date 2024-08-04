import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/redux/slices/cardsSlice";
import allIcon from "../../app/assets/images/icons/all-W.png";
import csIcon from "../../app/assets/images/icons/cs-W.png";
import ftIcon from "../../app/assets/images/icons/fortnite-W.png";
import lolIcon from "../../app/assets/images/icons/lol-W.png";

//icons import
import { MdGames } from "react-icons/md";
import { SiLeagueoflegends } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";
import { AppDispatch, RootState } from "@/redux/store";
import { filterEmun, IFilters } from "@/interfaces/interfaceRedux";
import { filtered } from "@/redux/thunks/auxiliarSliceThunk";


const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    dispatch(filtered({
      name: name as filterEmun,
      value: value
    }))
  };

  return (
    <div className="flex flex-row justify-center p-2 gap-6">
      {/* <button className="buttonFilter" name="game" value={""} onClick={handleFilterClick}>
        <MdGames />
        <p>All Tournaments</p>
      </button> */}
      <button className="buttonFilter" name="game" value={"CounterStrike Go"} onClick={handleFilterClick}>
        <SiCounterstrike />
        <p>Counter Strike</p>
      </button>
      <button className="buttonFilter" name="game" value={"Fortnite"} onClick={handleFilterClick}>
        <TbBrandFortnite />
        <p>Fortnite</p>
      </button>
      <button className="buttonFilter" name="game" value={"League of Legends"} onClick={handleFilterClick}>
        <SiLeagueoflegends />
        <p>League of Legends</p>
      </button>
    </div>
  );
};

export default SearchBar;
