import Image from "next/image";
import React from "react";
import Link from 'next/link';
import { name, navigationIcons, gameIcons, games, categoryIcons, description } from '@/utils/tournamentsData';
import { ITournament } from "@/interfaces/interfaceTournaments";

export const Details: React.FC<{ tournament: ITournament }> = ({ tournament }) => {
    const backgroundImage = games[tournament.id];
    const gameIcon = gameIcons[tournament.id];
    const categoryIcon = categoryIcons[tournament.categories];
    const tournamentName = name[tournament.id] || "Unknown Tournament";
    const tournamentDescription = description[tournament.id] || "No description available";

    return (
        <div>
        <Image
        src={backgroundImage}
        alt={tournamentName}
        className="w-full max-h-500px"
      />
      <div className='bodyContainer mt-4 mb-12 grid grid-cols-2 gap-4'>
        <div>
          <h1 className='heading2 text-lightViolet'>Tournament {tournamentName}</h1>
          <Link className="buttonPrimary m-4" href={`/tournaments/${tournament.id}/register`}>
            Register
          </Link>
          <div className="flex flex-row justify-start gap-12 mt-6">
            <Image src={categoryIcon} alt="Icon" className="icon" />
            <Image src={gameIcon} alt="Icon" className="icon" />
            <Image src={navigationIcons.vip} alt="Icon" className="icon" />
          </div>
          <p className='description text-2xl mt-6'>{tournamentDescription}</p>
        </div>
        </div>
        </div>
    )
}