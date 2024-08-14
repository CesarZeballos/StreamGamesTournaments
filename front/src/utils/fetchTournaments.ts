import { ITournamentPayment } from "@/interfaces/interfaceRedux";
import { IAddTeam, ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";
import { IDeletetournament } from "@/interfaces/interfaceUser";

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
            return tournament;
        }
}

//funcion para traer los todos los juegos
export async function fetchGames() {
    const response = await fetch(`${apiUrl}/games`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error(`Error fetching games: ${response.statusText}`);
    } else {
        const allGames = await response.json();
        if (!Array.isArray(allGames)) {
            throw new Error("API response is not an array.");
        }
        console.log(allGames)
        return allGames;
    }
}

export const banGame = async (id:string) => {
    const response = await fetch(`${apiUrl}/games/delete/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to disable game');
    }
    return response.json();
}

//funcion para pagar la inscripcion al torneo:
export const fetchPaymentTournament = async (data: ITournamentPayment) => {
    const response = await fetch(`${apiUrl}/paypal/create-order/${data.tournamentId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
    });
    
    const returnData = await response.json();
    return returnData
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

export const fetchUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${apiUrl}/uploadfile`, {
        method: "POST",
        body: formData
    });
    const dataResponse = await response.json();
    console.log("dataResponse", dataResponse)
    return dataResponse.url
}


export const fetchPostTournemnt = async (data: {data: ITournamentPost, token: string}) => {
    console.log('data', data)
    const response = await fetch(`${apiUrl}/tournaments/add`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify(data.data)
    })



    const dataResponse = await response.json();
    return dataResponse
}

export const fetchDeleteTournaments = async (data: IDeletetournament) => {
    const response = await fetch(`${apiUrl}/tournaments/deleteTournament/${data.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const dataResponse = await response.json();
    return dataResponse
}