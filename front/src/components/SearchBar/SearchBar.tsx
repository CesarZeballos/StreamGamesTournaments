import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/slices/cardsSlice";
import allIcon from "../../app/assets/images/icons/all-W.png";
import csIcon from "../../app/assets/images/icons/cs-W.png";
import ftIcon from "../../app/assets/images/icons/fortnite-W.png";
import lolIcon from "../../app/assets/images/icons/lol-W.png";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex flex-row justify-between p-2 gap-6 overflow-hidden">
      <button className="buttonFilter" onClick={() => handleFilterClick("All Tournaments")}>
        <Image src={allIcon} alt="All Tournaments" className="s-icon" />
        <p>All Tournaments</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("Counter Strike")}>
        <Image src={csIcon} alt="CS: GO" className="s-icon" />
        <p>CS: GO</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("Fortnite")}>
        <Image src={ftIcon} alt="Fortnite" className="s-icon" />
        <p>Fortnite</p>
      </button>
      <button className="buttonFilter" onClick={() => handleFilterClick("League of Legends")}>
        <Image src={lolIcon} alt="LoL" className="s-icon" />
        <p>League of Legends</p>
      </button>
    </div>
  );
};

export default SearchBar;