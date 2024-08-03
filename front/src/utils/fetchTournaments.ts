import { ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    if (!Array.isArray(allTournaments)) {
        throw new Error("API response is not an array.");
    }
    console.log(allTournaments)
    return allTournaments;
}

export async function postTournament(data: ITournamentPost) {
    const response = await fetch("http://localhost:3001/tournaments/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error(`Error fetching tournaments: ${response.statusText}`);
    }
    const postedTournament = await response.json();
    return postedTournament;
}

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
