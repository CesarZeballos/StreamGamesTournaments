"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { fetchTournaments } from "@/utils/fetchTournaments";
import { ITournament } from "@/interfaces/interfaceTournaments";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";
import previous from "../../app/assets/images/icons/previous.png";
import next from "../../app/assets/images/icons/next.png";
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";
import bronze from "../../app/assets/images/icons/medal-bronze.png";
import silver from "../../app/assets/images/icons/medal-silver.png";
import gold from "../../app/assets/images/icons/medal-gold.png";
import vip from "../../app/assets/images/icons/premium.png";

type ImageSource = StaticImageData | string;

const gameIcons: { [key: string]: ImageSource } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": csIcon,
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": csIcon,
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": csIcon,
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": ftIcon,
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": ftIcon,
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": ftIcon,
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": lolIcon,
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": lolIcon,
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": lolIcon,
};

const games: { [key: string]: ImageSource } = {
    "a2b3c4d5-6e7f-8g9h-0i1j-2k3l4m5n6o7p": csgo,
    "b3c4d5e6-7f8g-9h0i-1j2k-3l4m5n6o7p8q": csgo,
    "c4d5e6f7-8g9h-0i1j-2k3l-4m5n6o7p8q9r": csgo,
    "d5e6f7g8-9h0i-1j2k-3l4m-5n6o7p8q9r0s": fortnite,
    "e6f7g8h9-0i1j-2k3l-4m5n-6o7p8q9r0s1t": fortnite,
    "f7g8h9i0-1j2k-3l4m-5n6o-7p8q9r0s1t2u": fortnite,
    "d1f5d4e7-9b64-4d39-aebd-f76980d72f3e": lol,
    "g8h9i0j1-2k3l-4m5n-6o7p-8q9r0s1t2u3v": lol,
    "h9i0j1k2-3l4m-5n6o-7p8q-9r0s1t2u3v4w": lol,
};

const categoryIcons: { [key: string]: ImageSource } = {
    "CATEGORY1": bronze,
    "CATEGORY2": silver,
    "CATEGORY3": gold,
};

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
        console.log('Next button clicked');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tournaments.length);
    };
    
    const handlePrev = () => {
        console.log('Previous button clicked');
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
        <div className="mb-16">
            <Image src={previous} alt="Previous Button" className="buttonCarousel absolute left-0 z-0" onClick={handlePrev} />
            <div className="relative flex flex-row justify-center mr-large ml-large mb-medium mt-medium rounded-xl">
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
                                <Image src={vip} alt="Vip Icon" className="icon" />
                            </div>
                        </div>
                        <p className="description text-left text-xl m-2">{currentTournament.startDate}</p>
                    </div>
                </div>
            </div>
            <Image
                src={next}
                alt="Next"
                className="buttonCarousel absolute right-0 z-0"
                onClick={handleNext}
            />
        </div>
    );
};

export default LiveBanner;