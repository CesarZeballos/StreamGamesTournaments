import React, { Suspense } from "react";
import SideBar from "@/components/SideBar/SideBar"
import SearchBar from "@/components/SearchBar/SearchBar";

const Tournaments: React.FC = () => {
    return (
        <Suspense fallback={<p className="loading">Loading Home Page...</p>}>
        <>
        <div className="bodyContainer">
        <SearchBar />
        <SideBar />
        </div>
        </>
        </Suspense>
    )
}

export default Tournaments;