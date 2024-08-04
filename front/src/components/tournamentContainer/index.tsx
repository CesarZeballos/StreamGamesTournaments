import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux"
import { Tournaments } from "../Tournaments/Tournaments";
import { useEffect } from "react";
import { getTournamentsSlice } from "@/redux/thunks/tournamentsSliceThunk";


export const TournamentContainer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tournaments = useSelector((state: RootState) => state.tournament.tournamentsFiltered);

    useEffect(() => {
        dispatch(getTournamentsSlice())
    }, [])
    return (
        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
            {!tournaments && <p>No tournaments found</p>}
            {tournaments.length === 0 ? 
            <h1>sorry, no tournaments found</h1> : (
                tournaments.map((tournament) => (
                    <Tournaments key={tournament.id} tournament={tournament} />
                ))
            )}
        </div>
    )
}