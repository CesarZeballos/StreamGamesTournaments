import { IAddTeamToTournament } from "@/interfaces/interfaceRedux";
import { IAddTeam, ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";

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
        console.log("Awards field:", tournament.award);
            return tournament;
        }
}

//funcion para inscribirse al torneo:
export const fetchPaymentTournament = async (info: IAddTeamToTournament) => {
    const response = await fetch(`${apiUrl}/paypal/create-order`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${info.token}`
        },
        body: JSON.stringify(info.teamData)
    });
    
    const data = await response.json();
    return data.id
}

export const fetchAddTeamToTournament = async (data: IAddTeamToTournament) => {
    const response = await fetch(`${apiUrl}/teams`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify(data)
    });

    const dataResponse = await response.json();
    return dataResponse
}

