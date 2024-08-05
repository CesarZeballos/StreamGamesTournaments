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

//icons import
import { MdGames } from "react-icons/md";
import { SiLeagueoflegends } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";
import { filterEmun } from "@/interfaces/interfaceRedux";
import { filtered } from "@/redux/thunks/auxiliarSliceThunk";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";


export const FindBanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    router.push(`/tournaments`);
    setTimeout(() => dispatch(filtered({
      name: name as filterEmun,
      value: value
    })), 300);
  };

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
            <div className="my-36 bodyContainer">
                <h1 className="heading2 text-left mb-12 text-white">Find your tournament:</h1>
                <div className="flex flex-row justify-around gap-6">
                    <Link className="buttonSection" href="/tournaments">
                        <MdGames />
                        <p className="textButton">All Tournaments</p>
                    </Link>

                    <button className="buttonSection" name="game" value="CounterStrike Go" onClick={handleFilterClick}>
                        <SiCounterstrike/>
                        <p className="textButton">CS: GO</p>
                    </button>

                    <button className="buttonSection" name="game" value="Fortnite" onClick={handleFilterClick} >
                        <TbBrandFortnite />
                        <p className="textButton">Fortnite</p>
                    </button>
                    
                    <button className="buttonSection" name="game" value="League of Legends" onClick={handleFilterClick} >
                        <SiLeagueoflegends />
                        <p className="textButton">League of Legends</p>
                    </button>
                </div>
            </div>
        </Suspense>
    )
}

export default FindBanner;