"use client";
import React, { Suspense, useEffect, useState } from "react";
import { IGame } from "@/interfaces/interfaceTournaments";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { filtered, getGamesActivesSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

// Icons import
import { MdGames } from "react-icons/md";
import { SiLeagueoflegends, SiCounterstrike } from "react-icons/si";
import { SiValorant } from "react-icons/si";
import { SiPubg } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";
import { filterEmun } from "@/interfaces/interfaceRedux";

// Icon mapping
const iconMap: { [key: string]: JSX.Element } = {
  "League of Legends": <SiLeagueoflegends />,
  "CounterStrike Go": <SiCounterstrike />,
  "Fortnite": <TbBrandFortnite />,
  "PUBG": <SiPubg />,
  "Valorant": <SiValorant />,
};

export const FindBanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [banner, setBanner] = useState<IGame[]>([]);
  const games = useSelector((state: RootState) => state.tournament.games);

  useEffect(() => {
      // Dispatch to get active games only if games array is empty
      if (games.length === 0) {
          dispatch(getGamesActivesSlice());
      }
  }, [dispatch, games.length]);

  useEffect(() => {
      // Update banner state whenever games change
      setBanner(games);
  }, [games]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    router.push(`/tournaments`);
    setTimeout(() => dispatch(filtered({
      name: name as filterEmun,
      value: value
    })), 400);
  };

  return (
    <Suspense fallback={<div className="loading">Loading banner...</div>}>
      <div className="bodyContainer">
        <h1 className="heading2 text-left mb-12 text-white">Find your tournament:</h1>
        <div className="flex flex-row gap-6">
          <Link className="buttonSection" href="/tournaments">
            <MdGames />
            <p className="textButton">All Tournaments</p>
          </Link>
          {banner.map(game => (
            <button
              key={game.id}
              className="buttonSection"
              name="game"
              value={game.name}
              onClick={handleFilterClick}
            >
              {iconMap[game.name] || <MdGames />}  {/* Default icon if no match */}
              <p className="textButton">{game.name}</p>
            </button>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default FindBanner;