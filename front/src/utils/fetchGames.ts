const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    const response = await fetch(`${apiUrl}/games/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: false
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to disable game');
    }
    return response.json();
}

export const reactivateGame = async (id:string) => {
    const response = await fetch(`${apiUrl}/games/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: true
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to reactivate game');
    }
    return response.json();
}