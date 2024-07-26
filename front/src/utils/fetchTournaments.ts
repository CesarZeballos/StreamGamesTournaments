import { ITournament } from "@/interfaces/interfaceTournaments";

export async function fetchTournaments(): Promise<ITournament[]> {
    try {
        const response = await fetch("http://localhost:3001/tournaments", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const allTournaments = await response.json();
        return allTournaments;
    } catch (error) {
        console.error("Error fetching tournaments.", error);
        return [];
    }
}