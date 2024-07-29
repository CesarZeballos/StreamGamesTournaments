import { ITournament, IAddTeam } from "@/interfaces/interfaceTournaments";
import { format } from "date-fns";

export async function fetchTournaments(): Promise<ITournament[]> {
    try {
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

        // Verificación y mensaje de depuración
        console.log("Raw API response:", allTournaments);

        if (!Array.isArray(allTournaments)) {
            throw new Error("API response is not an array.");
        }

        const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));

        return formattedTournaments;
    } catch (error) {
        console.error("Error fetching tournaments.", error);
        return [];
    }
}

export async function fetchTournamentById(id: string) {
    try {
        const response = await fetch(`http://localhost:3001/tournaments/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching tournament: ${response.statusText}`);
        } else {
            const tournament = await response.json();
            console.log("Raw API response:", tournament);
            return tournament;
        }
    } catch (error) {
        console.error("Error fetching tournament.", error);
    }
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
