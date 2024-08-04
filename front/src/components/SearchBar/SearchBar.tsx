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
import { RootState } from "@/redux/store";
import { IFilters } from "@/interfaces/interfaceRedux";
import { setRunFilters } from "@/redux/slices/tournamentSlice";


const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.tournament.filters);
  const [changeFilter, setChangeFilter] = React.useState<IFilters>({
    game: filters.game,
    category: filters.category,
    price: filters.price,
    date: filters.date
  });

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    setChangeFilter({
      ...changeFilter,
      [name]: value
    })
  };

  useEffect(() => {
    dispatch(setRunFilters(changeFilter)), [changeFilter]
  }, [changeFilter, dispatch])

  return (
    <div className="flex flex-row justify-center p-2 gap-6">
      <button className="buttonFilter" name="game" value={""} onClick={handleFilterClick}>
        <MdGames />
        <p>All Tournaments</p>
      </button>
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
