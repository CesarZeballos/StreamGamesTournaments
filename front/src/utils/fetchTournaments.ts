import { IAddTeam, ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//funcion para recibir todos los torneos
export async function fetchTournaments(): Promise<ITournament[]> {
<<<<<<< HEAD
        const response = await fetch(`${apiUrl}/tournaments`, {
=======
        const response = await fetch("http://localhost:3001/tournaments", {
>>>>>>> origin/cesar
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
<<<<<<< HEAD
        // const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
        //     ...tournament,
        //     startDate: format(new Date(tournament.startDate), "dd/MM")
        // }));
        // return formattedTournaments;
        return allTournaments;
=======
        const formattedTournaments = allTournaments.map((tournament: ITournament) => ({
            ...tournament,
            startDate: format(new Date(tournament.startDate), "dd/MM")
        }));
        return formattedTournaments;
>>>>>>> origin/cesar
}

// funcion para recibir el torneo por id
export async function fetchTournamentById(id: string) {
<<<<<<< HEAD
        const response = await fetch(`${apiUrl}/tournaments/${id}`, {
=======
        const response = await fetch(`http://localhost:3001/tournaments/${id}`, {
>>>>>>> origin/cesar
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

<<<<<<< HEAD
//funcion para inscribirse al torneo:
export const fetchAddTeamToTournament = async (data: IAddTeam, token: string) => {
    const response = await fetch(`${apiUrl}/teams`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error adding team to tournament: ${response.statusText}`);
    }
    console.log("response", response)
    return response
=======
export async function addTeamFetch(data: IAddTeam) {
        const response = await fetch("http://localhost:3001/tournaments/team", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const addTeamResponse = await response.json();
        return addTeamResponse;
>>>>>>> origin/cesar
}

export const fetchPaymentTournament = async (data: IAddTeam, token: string) => {
    const response = await fetch(`${apiUrl}/paypal/create-order`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`Error adding team to tournament: ${response.statusText}`);
    }
    console.log("response payment", response)
    return response
}