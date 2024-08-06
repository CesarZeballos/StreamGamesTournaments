"use client";
import React, { Suspense } from "react";
import SideBar from "@/components/SideBar/SideBar"
import SearchBar from "@/components/SearchBar/SearchBar";
import { TournamentContainer } from "@/components/tournamentContainer";
import { Paged } from "@/components/paged";

const Tournaments: React.FC = () => {
    return (
        <Suspense fallback={<p className="loading">Loading Tournaments Page...</p>}>
        <>
        <div className="bodyContainer">
        <SearchBar />
        <div className="grid grid-cols-4">
        <SideBar />
        <TournamentContainer />
        <br/>
        <Paged />
        </div>
        </div>
        </>
        </Suspense>
    )
}

export default Tournaments;