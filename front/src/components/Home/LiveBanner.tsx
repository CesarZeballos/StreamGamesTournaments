"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { fetchTournaments } from "@/utils/fetchTournaments";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { gameIcons, gameImages, categoryIcons, navigationIcons } from "@/utils/tournamentsData";

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

    const gameImage = gameImages[currentTournament.game.name];
    const gameIcon = gameIcons[currentTournament.game.name];
    const categoryIcon = categoryIcons[currentTournament.categories];

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
        <div>
            <Image src={navigationIcons.previous} alt="Previous Button" className="buttonCarousel ml-medium absolute left-0 z-0" onClick={handlePrev} />
            <div className="relative flex flex-row justify-center mr-large ml-large mb-medium rounded-xl">
                <Image
                    src={gameImage}
                    alt={currentTournament.categories}
                    className="w-2/3 h-2/3 z-10 rounded-3xl"
                />
                <div className="absolute w-3/4 h-full flex justify-end z-20 bg-opacity-0">
                    <div className="w-2/5 p-2 bg-BGdark rounded-3xl overflow-hidden father-container">
                        <div className="flex flex-col gap-x-4 m-2 child-container">
                            <h1 className="heading3 text-center text-lightViolet">Live Tournament</h1>
                            <div className="flex flex-row justify-between m-1">
                                <Image src={categoryIcon} alt="Category Icon" className="s-icon" />
                                <Image src={gameIcon} alt="Game Icon" className="s-icon" />
                                <Image src={navigationIcons.vip} alt="Vip Icon" className="s-icon" />
                            </div>
                        </div>
                        <p className="description text-left text-xl m-2">{currentTournament.description}</p>
                    </div>
                </div>
            </div>
            <Image
                src={navigationIcons.next}
                alt="Next"
                className="buttonCarousel mr-medium absolute right-0 z-0"
                onClick={handleNext}
            />
        </div>
        </Suspense>
    );
};

export default LiveBanner;
