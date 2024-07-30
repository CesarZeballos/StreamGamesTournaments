import { ITournament, IAddTeam } from "@/interfaces/interfaceTournaments";
import { format } from "date-fns";

export async function fetchTournaments(): Promise<ITournament[]> {
        const response = await fetch("http://localhost:3001/tournaments", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching tournaments: ${response.statusText}`);
        }
        const allTournaments = await response.json();
        const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));
        return formattedTournaments;
}

export async function fetchTournamentById(id: string): Promise<ITournament | null> {
    const tournaments = await fetchTournaments();
    return tournaments.find(tournament => tournament.id === id) || null;
}

export async function addTeamFetch(data: IAddTeam) {
    try {
        const response = await fetch("http://localhost:3001/tournaments/team", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const addTeamResponse = await response.json();
        return addTeamResponse;
    } catch (error) {
        console.error("Error adding team.", error);
    }
}
