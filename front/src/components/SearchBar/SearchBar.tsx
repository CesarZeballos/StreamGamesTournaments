import Image from "next/image";
import React from "react";
import allIcon from "../../app/assets/images/icons/allTour.png";
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";

const SearchBar: React.FC = () => {
    return (
        <>
        <div className="flex flex-row justify-around p-2 gap-6 overflow-hidden">
        <button className="buttonFilter">
        <Image src={allIcon} alt="All Tournaments" className="s-icon" />
        <p className="">All Tournaments</p>
        </button>
        <button className="buttonFilter">
        <Image src={csIcon} alt="CS: GO" className="s-icon" />
        <p className="">CS: GO</p>
        </button>
        <button className="buttonFilter">
        <Image src={ftIcon} alt="Fortnite" className="s-icon" />
        <p className="">Fortnite</p>
        </button>
        <button className="buttonFilter">
        <Image src={lolIcon} alt="LoL" className="s-icon" />
        <p className="">League of Legends</p>
        </button>
        </div>
        </>
    )
}

export default SearchBar;