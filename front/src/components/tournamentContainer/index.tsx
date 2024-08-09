import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux"
import { Tournaments } from "../Tournaments/Tournaments";
import { useEffect, useState } from "react";
import { getTournamentsSlice } from "@/redux/thunks/tournamentsSliceThunk";
import { ITournament } from "@/interfaces/interfaceTournaments";


export const TournamentContainer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tournamentsFiltered = useSelector((state: RootState) => state.tournament.tournamentsFiltered);
    const page = useSelector((state: RootState) => state.tournament.currentPage);
    const tournamentsPerPage = useSelector((state: RootState) => state.tournament.tournamentsPerPage);
    const [tournaments, setTournaments] = useState<ITournament[]>(tournamentsFiltered);

    useEffect(() => {
        dispatch(getTournamentsSlice())
    }, [dispatch])

    // calculo del paginado
    useEffect(() => {
        const startIndex = (page - 1) * tournamentsPerPage;
        const endIndex = startIndex + tournamentsPerPage;
        const tournaments = tournamentsFiltered.slice(startIndex, endIndex);
        setTournaments(tournaments);
    }, [page, tournamentsFiltered, tournamentsPerPage]);

    return (
        <div className="col-span-3 mb-9 grid grid-cols-3 grid-rows-3 mt-8 gap-x-6 gap-y-8">
            {!tournaments && <h1 className="heading5 text-lightViolet text-center col-span-2 mt-9">No tournaments found</h1>}
            {tournaments.length === 0 ? <h1 className="heading5 text-lightViolet text-center col-span-2 mt-9">sorry, no tournaments found</h1> : (
                tournaments.map((tournament) => (
                    <Tournaments key={tournament.id} tournament={tournament} />
                ))
            )}
        </div>
    )
}