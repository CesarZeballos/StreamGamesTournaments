import { ITournament } from "@/interfaces/interfaceTournaments";
import { format } from "date-fns";

export async function fetchTournaments(): Promise<ITournament[]> {
    try {
        const response = await fetch("http://localhost:3001/tournaments", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const allTournaments = await response.json();
        return allTournaments.map((tournament: ITournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));
    } catch (error) {
        console.error("Error fetching tournaments.", error);
        return [];
    }
}

export async function fetchTournamentById(id: string): Promise<ITournament | null> {
    const tournaments = await fetchTournaments();
    return tournaments.find(tournament => tournament.id === id) || null;
}
