import { ITournamentPayment } from "@/interfaces/interfaceRedux";
import { IAddTeam, ITournament } from "@/interfaces/interfaceTournaments";

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

//funcion para pagar la inscripcion al torneo:
export const fetchPaymentTournament = async (data: ITournamentPayment) => {
    const response = await fetch(`${apiUrl}/paypal/create-order`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({
            // tournamentId: data.tournamentId
        })
    });
    
    const returnData = await response.json();
    return returnData.id
}

export const fetchCapturePaymentTournament = async (data: string) => {
    const response = await fetch(`${apiUrl}/paypal/capture-order/${data}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const returnData = await response.json();
    return returnData
}

export const fetchAddTeamToTournament = async (data: IAddTeam) => {
    const response = await fetch(`${apiUrl}/teams`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify({
            name: data.name,
            tournamentId: data.tournamentId,
            organizerId: data.organizerId,
            users: data.users
        })
    });

    const dataResponse = await response.json();
    return dataResponse
}

