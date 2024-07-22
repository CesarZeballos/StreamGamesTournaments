"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";

const LiveBanner: React.FC = () => {
    const [background, setBackground] = useState({ image: csgo, description: 'CS: GO Tournament' });

    const handleIconClick = (game: string) => {
        switch (game) {
            case 'CS:GO':
                setBackground({ image: csgo, description: 'CS: GO Tournament' });
                break;
            case 'Fortnite':
                setBackground({ image: fortnite, description: 'Fortnite Tournament' });
                break;
            case 'LoL':
                setBackground({ image: lol, description: 'League of Legends Tournament' });
                break;
            default:
                setBackground({ image: csgo, description: 'CS: GO Tournament' });
        }
    };

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
            <div className="relative flex flex-col justify-center m-large rounded-xl border-2 border-lightViolet md:flex-row">
                <div className="w-full rounded-r-xl lg:w-6/10 rounded-l-xl overflow-hidden z-0">
                    <Image
                        src={background.image}
                        alt={background.description}
                        className="object-cover h-40 lg:h-full"
                    />
                </div>
                <div className="absolute w-full h-full flex justify-end z-10 lg:w-6/10 rounded-l-xl bg-BGdark bg-opacity-0">
                    <div className="flex flex-col justify-start p-5 bg-BGdark md:w-3/10 rounded-r-xl">
                        <h1 className="heading3 text-center">Live Tournament</h1>
                        <div className="flex justify-center space-x-4 mt-4">
                            <Image src={csIcon} alt="CS: GO" className="icon cursor-pointer" onClick={() => handleIconClick("CS:GO")} />
                            <Image src={ftIcon} alt="Fortnite" className="icon cursor-pointer" onClick={() => handleIconClick("Fortnite")} />
                            <Image src={lolIcon} alt="LoL" className="icon cursor-pointer" onClick={() => handleIconClick("LoL")} />
                        </div>
                        <p className="description mt-4 text-center">{background.description}</p>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default LiveBanner;
