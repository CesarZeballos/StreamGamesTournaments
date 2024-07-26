// LiveBanner.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchTournaments } from "@/utils/fetchTournaments";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { gameIcons, games, categoryIcons, navigationIcons } from "@/utils/tournamentsData";

const LiveBanner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tournaments, setTournaments] = useState<ITournament[]>([]);

    useEffect(() => {
        async function getTournaments() {
            const fetchedTournaments = await fetchTournaments();
            setTournaments(fetchedTournaments);
        }

        getTournaments();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tournaments.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tournaments.length) % tournaments.length);
    };

    if (tournaments.length === 0) {
        return <div className="loading">Loading banner...</div>;
    }

    const currentTournament = tournaments[currentIndex];

    const backgroundImage = games[currentTournament.id];
    const gameIcon = gameIcons[currentTournament.id];
    const categoryIcon = categoryIcons[currentTournament.categories];

    return (
        <div className="">
            <Image src={navigationIcons.previous} alt="Previous Button" className="buttonCarousel absolute left-0 z-0" onClick={handlePrev} />
            <div className="relative flex flex-row justify-center mr-large ml-large mb-medium rounded-xl">
                <Image
                    src={backgroundImage}
                    alt={currentTournament.categories}
                    className="w-2/3 h-2/3 z-10 rounded-3xl"
                />
                <div className="absolute w-3/4 h-full flex justify-end z-20 bg-opacity-0">
                    <div className="w-2/5 p-2 bg-BGdark rounded-3xl overflow-hidden father-container">
                        <div className="flex flex-col gap-x-4 m-2 child-container">
                            <h1 className="heading3 text-center text-lightViolet">Live Tournament</h1>
                            <div className="flex flex-row justify-between m-2">
                                <Image src={categoryIcon} alt="Category Icon" className="icon" />
                                <Image src={gameIcon} alt="Game Icon" className="icon" />
                                <Image src={navigationIcons.vip} alt="Vip Icon" className="icon" />
                            </div>
                        </div>
                        <p className="description text-left text-xl m-2">{currentTournament.startDate}</p>
                    </div>
                </div>
            </div>
            <Image
                src={navigationIcons.next}
                alt="Next"
                className="buttonCarousel absolute right-0 z-0"
                onClick={handleNext}
            />
        </div>
    );
};

export default LiveBanner;
