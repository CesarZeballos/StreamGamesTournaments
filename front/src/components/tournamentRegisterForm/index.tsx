'use client'
import { ITournament } from "@/interfaces/interfaceTournaments";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const TournamentRegisterForm = ({tourId}: {tourId: string}) => {
    const dispatch = useDispatch();
    const [tournamentData, setTournamentData] = useState<ITournament>({
        _id: "",
        name: "",
        description: "",
        date: "",
        image: "",
        players: 0
    })

    useEffect(() => {
        // const data = dispatch(state.getTournament(tourId))
        // setTournamentData(data)
    }, [])

    return (
        <div>
            <h1 className="heading1">Register to {tournamentData.name}</h1>
            <h1>Register Torunament Form</h1>
        </div>
    );
}