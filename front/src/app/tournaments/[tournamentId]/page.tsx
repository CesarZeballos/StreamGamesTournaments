"use client";
import Link from 'next/link';
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from 'react';
import { fetchTournaments } from '@/utils/fetchTournaments';
import { ITournament } from '@/interfaces/interfaceTournaments';
import csIcon from "../../assets/images/icons/cs-A.png";
import ftIcon from "../../assets/images/icons/fortnite-A.png";
import lolIcon from "../../assets/images/icons/lol-A.png";
import bronze from "../../assets/images/icons/medal-bronze.png";
import silver from "../../assets/images/icons/medal-silver.png";
import gold from "../../assets/images/icons/medal-gold.png";
import csgo from "../../assets/images/banners/csgo.jpg";
import fortnite from "../../assets/images/banners/fortnite.jpg";
import lol from "../../assets/images/banners/lol.png";
import vip from "../../assets/images/icons/premium.png";

type ImageSource = StaticImageData | string;

const gameIcons: { [key: string]: ImageSource } = {
    "csgo-id": csIcon,
    "fortnite-id": ftIcon,
    "lol-id": lolIcon,
};

const categoryIcons: { [key: string]: ImageSource } = {
    "CATEGORY1": bronze,
    "CATEGORY2": silver,
    "CATEGORY3": gold,
};

const games: { [key: string]: ImageSource } = {
    "csgo-urlStream": csgo,
    "fortnite-urlStream": fortnite,
    "lol-urlStream": lol,
};

const descriptions: { [key: string]: string } = {
    "csgo-id": "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.",
    "fortnite-id": "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
    "lol-id": "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
};

const TournamentPage: React.FC = () => {
    const [tournaments, setTournaments] = useState<ITournament[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tournamentsPerPage = 9;

    useEffect(() => {
        async function getTournaments() {
            const fetchedTournaments = await fetchTournaments();
            setTournaments(fetchedTournaments);
        }

        getTournaments();
    }, []);

    const indexOfLastTournament = currentPage * tournamentsPerPage;
    const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
    const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

    const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (tournaments.length === 0) {
        return <div className="loading">Loading tournaments...</div>;
    }

    return (
        <div className="tournament-page">
            <div className="grid grid-cols-3 gap-4">
                {currentTournaments.map(tournament => (
                    <div key={tournament.id} className="tournament-card">
                        <Image
                            src={games[`${tournament.urlStream}-urlStream`] || csgo}
                            alt={tournament.categories}
                            className="w-full max-h-500px"
                        />
                        <div className="bodyContainer mt-4 mb-12">
                            <h1 className='heading2 text-lightViolet'>Tournament {tournament.categories}</h1>
                            <Link className="buttonPrimary m-4" href={`/tournaments/${tournament.id}/register`}>
                                Register
                            </Link>
                            <div className="flex flex-row justify-start gap-12 mt-6">
                                <Image src={categoryIcons[tournament.categories] || bronze} alt="Category Icon" className="icon" />
                                <Image src={gameIcons[tournament.gameId] || csIcon} alt="Game Icon" className="icon" />
                                <Image src={vip} alt="Vip Icon" className="icon" />
                            </div>
                            <p className='description text-2xl mt-6'>
                                {descriptions[tournament.gameId] || "Watch the tournament live!"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination-controls flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TournamentPage;