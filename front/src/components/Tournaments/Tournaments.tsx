import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { gameImages } from "@/utils/tournamentsData";
import { CategoryIcon, GameIcon, PriceIcon } from "./type";
import { isoToDate } from "@/utils/formatDate";
import GroupsIcon from '@mui/icons-material/Groups';

export const Tournaments: React.FC<{ tournament: ITournament }> = ({ tournament }) => {
    const gameImage = gameImages[tournament.game.name] || "/default-image.png";

    const date = isoToDate(tournament.startDate);
    const capacity = tournament.maxTeams
    const teams = tournament.teams.length

    return (
        <Link href={`/tournaments/${tournament.id}`}>
            <div className="relative h-64 cursor-pointer rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-lightViolet">
                <div className="overflow-hidden h-48">
                    <Image
                        src={tournament.urlAvatar}
                        alt={tournament.nameTournament}
                        className="w-full h-full object-cover"
                        width={500}
                        height={200}
                    />
                </div>
                <div className="absolute bottom-1 left-0 right-0 p-4 bg-BGdark rounded-3xl h-fit">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="heading5 text-lightViolet text-wrap">{tournament.nameTournament}</h1>
                        <h1 className="numberCard text-white">{date}</h1>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <CategoryIcon category={tournament.category} />
                            <GameIcon game={tournament.game.name} />
                            <PriceIcon price={tournament.price} />
                        </div>
                        <p className="body text-lightViolet">{teams} / {capacity} <GroupsIcon/></p>
                    </div>
                </div>
            </div>
        </Link>
    );
};