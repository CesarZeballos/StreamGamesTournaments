"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";
import previous from "../../app/assets/images/icons/previous.png"
import next from "../../app/assets/images/icons/next.png"


const banners = [
    { image: csgo, description: 'CS: GO Tournament' },
    { image: fortnite, description: 'Fortnite Tournament' },
    { image: lol, description: 'League of Legends Tournament' },
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
                    className="w-3/4 h-3/4 z-10 rounded-xl rounded-r-3xl"
                />
                <div className="absolute w-3/4 h-full flex justify-end z-20 bg-opacity-0">
                    <div className="flex flex-col justify-start p-5 bg-BGdark rounded-3xl w-1/2 md:w-1/3">
                        <h1 className="heading3 text-center">Live Tournament</h1>
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
