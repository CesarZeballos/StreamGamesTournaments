"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { IGame } from "@/interfaces/interfaceTournaments";
import { gameImages, categoryIcons, navigationIcons } from "@/utils/tournamentsData";

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { banners } from "@/utils/GamesArray";
import { SiCounterstrike, SiLeagueoflegends } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";

const LiveBanner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [banner, setBanner] = useState<IGame[]>(banners);


    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banner.length) % banner.length);
    };

    if (banner.length === 0) {
        return <div className="loading">Loading banner...</div>;
    }

    const currentTournament = banner[currentIndex];

    const gameImage = gameImages[currentTournament.name];

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>

            <div className="flex flex-row items-center mb-36 mt-9">
                <button className="iconButton ml-8" onClick={handlePrev}><ArrowBackIosRoundedIcon /></button>
                <div className="relative flex flex-row justify-center h-96 rounded-3xl overflow-hidden mx-16">
                    <Image
                        src={gameImage}
                        alt={currentTournament.urlImage}
                        className="mr-96 object-cover"
                    />
                    <div className="absolute w-full h-full flex justify-end z-20 bg-opacity-0">
                        <div className="w-2/5 px-14 py-11 bg-BGdark rounded-3xl grid grid-rows-3 gap-16">
                            <h1 className="heading1 text-start text-lightViolet">{currentTournament.name}</h1>
                            <p className="description text-left text-xl row-span-2">{currentTournament.description}</p>
                        </div>
                    </div>
                </div>
                <button className="iconButton mr-8" onClick={handleNext}><ArrowForwardIosRoundedIcon /></button>
            </div>
        </Suspense>
    );
};

export default LiveBanner;
