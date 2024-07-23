"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";
import previous from "../../app/assets/images/icons/previous.png"
import next from "../../app/assets/images/icons/next.png"
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";
import bronze from "../../app/assets/images/icons/medal-bronze.png";
import silver from "../../app/assets/images/icons/medal-silver.png";
import gold from "../../app/assets/images/icons/medal-gold.png";
import free from "../../app/assets/images/icons/free2.png";
import vip from "../../app/assets/images/icons/premium-C.png";




const banners = [
    { image: csgo, description: "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.", icon1: silver, icon2: csIcon, icon3: free},
    { image: fortnite, description: "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!", icon1: gold, icon2: lolIcon, icon3: vip },
    { image: lol, description: "Watch a Fortnite tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament prize!", icon1: bronze, icon2: ftIcon, icon3: free },
];

const LiveBanner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
            <div className="relative flex flex-row justify-center m-large rounded-xl">
                <Image
                    src={previous}
                    alt="Previous"
                    className="buttonCarousel absolute left-0 z-0"
                    onClick={handlePrev}
                />
                <Image
                    src={banners[currentIndex].image}
                    alt={banners[currentIndex].description}
                    className="w-3/4 h-1/3 z-10 rounded-xl rounded-r-3xl"
                />
                <div className="absolute w-3/4 h-full flex justify-end z-20 bg-opacity-0">
                    <div className="flex flex-col justify-start p-5 bg-BGdark rounded-3xl w-1/2 md:w-1/3">
                        <h1 className="heading3 text-center">Live Tournament</h1>
                        <div className="flex flex-row justify-center gap-4 mt-4">
                        <Image src={banners[currentIndex].icon1} alt="Icon" className="icon" />
                        <Image src={banners[currentIndex].icon2} alt="Icon" className="icon" />
                        <Image src={banners[currentIndex].icon3} alt="Icon" className="icon" />
                        </div>
                        <p className="description mt-4 text-center">{banners[currentIndex].description}</p>
                    </div>
                </div>
                <Image
                    src={next}
                    alt="Next"
                    className="buttonCarousel absolute right-0 z-0 "
                    onClick={handleNext}
                />
            </div>
        </Suspense>
    );
};

export default LiveBanner;
