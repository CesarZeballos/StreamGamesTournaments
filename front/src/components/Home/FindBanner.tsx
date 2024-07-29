"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/slices/cardsSlice";
import allIcon from "../../app/assets/images/icons/all-A.png"
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";


export const FindBanner: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
<>
  <div className="mb-medium">
    <h1 className="heading2 text-left mb-6 ml-6 text-white">Find your tournament:</h1>
    <div className="flex flex-row justify-around gap-6">
    <Link className="buttonSection" onClick={() => handleFilterClick("All Tournaments")} href="/tournaments">
        <Image src={allIcon} alt="All Tournaments" className="s-icon" />
        <p className="textButton">All Tournaments</p>
      </Link>
      <Link className="buttonSection" onClick={() => handleFilterClick("Counter Strike")} href="/tournaments">
        <Image src={csIcon} alt="CSGO" className="s-icon" />
        <p className="textButton">CS: GO</p>
      </Link>
      <Link className="buttonSection" onClick={() => handleFilterClick("Fortnite")} href="/tournaments">
        <Image src={ftIcon} alt="Fortnite" className="s-icon" />
        <p className="textButton">Fortnite</p>
      </Link>
      <Link className="buttonSection" onClick={() => handleFilterClick("League of Legends")} href="/tournaments">
        <Image src={lolIcon} alt="LOL" className="s-icon"/>
        <p className="textButton">League of Legends</p>
      </Link>
    </div>
  </div>
</>

</Suspense>
    )
}

export default FindBanner;