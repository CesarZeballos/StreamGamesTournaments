"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { fetchTournaments } from "@/utils/fetchTournaments";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { gameIcons, gameImages, categoryIcons, navigationIcons } from "@/utils/tournamentsData";

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

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
    const categoryIcon = categoryIcons[currentTournament.category];

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>

            <div className="flex flex-row items-center mb-36 mt-9">
                <button className="iconButton ml-8" onClick={handlePrev}><ArrowBackIosRoundedIcon /></button>
                <div className="relative flex flex-row justify-center h-96 rounded-3xl overflow-hidden mx-16">
                    <Image
                        src={gameImage}
                        alt={currentTournament.category}
                        className="mr-96 object-cover"
                    />
                    <div className="absolute w-full h-full flex justify-end z-20 bg-opacity-0">
                        <div className="w-2/5 px-8 py-6 bg-BGdark rounded-3xl overflow-hidden">
                            <div className="flex flex-col gap-4 m-2">
                                <h1 className="heading1 text-start text-lightViolet">Live Tournament</h1>
                                <div className="flex flex-row justify-start gap-9">
                                    <Image src={categoryIcon} alt="Category Icon" className="s-icon" />
                                    <Image src={gameIcon} alt="Game Icon" className="s-icon" />
                                    <Image src={navigationIcons.vip} alt="Vip Icon" className="s-icon" />
                                </div>
                                <p className="description text-left text-xl m-2">{currentTournament.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="iconButton mr-8" onClick={handleNext}><ArrowForwardIosRoundedIcon /></button>
            </div>
        </Suspense>
    );
};

export default LiveBanner;
