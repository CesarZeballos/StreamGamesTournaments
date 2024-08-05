import { ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//funcion para recibir todos los torneos
export async function fetchTournaments(): Promise<ITournament[]> {
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
        // const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
        //     ...tournament,
        //     startDate: format(new Date(tournament.startDate), "dd/MM")
        // }));
        // return formattedTournaments;
        return allTournaments;
}

// funcion para recibir el torneo por id
export async function fetchTournamentById(id: string) {
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
        console.log("Awards field:", tournament.award);
            return tournament;
        }
}

//funcion para inscribirse al torneo:
//la ruta es: 
