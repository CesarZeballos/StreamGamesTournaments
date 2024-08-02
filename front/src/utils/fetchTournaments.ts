import { ITournament, IAddTeam } from "@/interfaces/interfaceTournaments";
import { format } from "date-fns";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTournaments(): Promise<ITournament[]> {
    console.log("URL_API", apiUrl)
        const response = await fetch(`${apiUrl}/tournaments`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching tournaments: ${response.statusText}`);
        }
        const allTournaments = await response.json();
        if (!Array.isArray(allTournaments)) {
            throw new Error("API response is not an array.");
        }
        const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));
        return formattedTournaments;
}

export async function fetchTournamentById(id: string) {
        const response = await fetch(`${apiUrl}/tournaments/${id}`, {
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
}

// export async function addTeamFetch(data: IAddTeam) {
//         const response = await fetch(`${apiUrl}/tournaments/team`, {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         });
//         const addTeamResponse = await response.json();
//         return addTeamResponse;
// }
