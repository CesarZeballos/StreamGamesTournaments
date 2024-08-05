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
        <div className="grid grid-cols-3 mt-8 gap-x-6 gap-y-8">
            {!tournaments && <h1 className="heading5 text-lightViolet text-center col-span-2 mt-9">No tournaments found</h1>}
            {tournaments.length === 0 ? <h1 className="heading5 text-lightViolet text-center col-span-2 mt-9">sorry, no tournaments found</h1> : (
                tournaments.map((tournament) => (
                    <Tournaments key={tournament.id} tournament={tournament} />
                ))
            )}
        </div>
    )
}