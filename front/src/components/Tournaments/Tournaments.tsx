import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { gameIcons, games, categoryIcons, name, navigationIcons } from "@/utils/tournamentsData";

  export const Tournaments: React.FC<{ tournament: ITournament }> = ({tournament}) => {
    const backgroundImage = games[tournament.id];
    const gameIcon = gameIcons[tournament.id];
    const categoryIcon = categoryIcons[tournament.categories];
    const tournamentName = name[tournament.id] || "Unknown Tournament";

    return (
      <Link href={`/tournaments/${tournament.id}`}>
        <div className="relative h-64 cursor-pointer rounded-3xl hover:shadow-lg hover:shadow-lightViolet">
          <Image
            src={backgroundImage}
            alt={tournamentName}
            className="w-full h-52 rounded-3xl"
          />
          <div className="absolute bottom-1 left-0 right-0 p-4 bg-BGdark rounded-3xl h-fit">
            <div className="flex justify-between items-center mb-2">
              <h1 className="heading5 text-lightViolet text-wrap">{tournamentName}</h1>
              <h1 className="numberCard text-white">{tournament.startDate}</h1>
            </div>
            <div className="flex justify-around">
              <Image src={categoryIcon} alt="Icon" className="s-icon" />
              <Image src={gameIcon} alt="Icon" className="s-icon" />
              <Image src={navigationIcons.vip} alt="Icon" className="s-icon" />
            </div>
          </div>
        </div>
      </Link>
    );
  };