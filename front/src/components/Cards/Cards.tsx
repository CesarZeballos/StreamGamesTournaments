import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { Tournaments } from "../Tournaments/Tournaments";
import { useMemo, useEffect } from "react";
import { getTournamentsSlice } from "@/redux/thunks/tournamentsSliceThunk";
import { format, parse, isThisMonth, isFuture, startOfMonth, endOfMonth } from 'date-fns';

const Cards: React.FC = () => {
    const { tournaments = [], filter } = useSelector((state: RootState) => state.tournaments);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getTournamentsSlice());
    }, [dispatch]);

    const filteredTournaments = useMemo(() => {
        if (!Array.isArray(tournaments)) {
            return [];
        }
        if (filter === "All Tournaments") {
            return tournaments;
        }

        const now = new Date();
        const startOfCurrentMonth = startOfMonth(now);
        const endOfCurrentMonth = endOfMonth(now);

        return tournaments.filter((tournament: { startDate: string; category: string; game: { name: string; }; }) => {
            const tournamentDate = parse(tournament.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Date());
            const categoryMatches = tournament.category === filter;
            const nameMatches = tournament.game.name === filter;

            if (filter === "THIS_MONTH") {
                return isThisMonth(tournamentDate);
            }
            if (filter === "NEXT_MONTHS") {
                return isFuture(tournamentDate) && tournamentDate > endOfCurrentMonth;
            }

            return categoryMatches || nameMatches;
        });
    }, [tournaments, filter]);

    const formattedTournaments = useMemo(() => {
        return filteredTournaments.map((tournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));
    }, [filteredTournaments]);

    return (
        <div>
            {formattedTournaments.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-6 gap-y-6 w-full ml-small mt-8">
                    {formattedTournaments.map((tournament: ITournament) => (
                        <Tournaments key={tournament.id} tournament={tournament} />
                    ))}
                </div>
            ) : (
                <p>No tournaments available</p>
            )}
        </div>
    );
};

export default Cards;