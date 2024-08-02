import { IAddFriendForm, ILoginDataBase, ILoginForm, IRegisterForm } from "@/interfaces/interfaceUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function postUser(data:IRegisterForm) {
    const dataFetch = JSON.stringify(data)
    console.log("dataFetch", dataFetch)
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataFetch
        })
        const loginData = await response.json()

        return loginData
    } catch (error) {
        console.log("Error registering user.", error)
    }
}

export async function loginUser(data: ILoginDataBase) {
    try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            let errorResponse;
            try {
                errorResponse = await response.json();
            } catch (e) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            throw new Error(errorResponse.message || 'Error en la solicitud');
        }

        const loginData = await response.json();

        return loginData;
    } catch (error) {
        console.log("Error logging in user.", error)
    }
}

export async function passwordRecovery(data: string) {try {
    const response = await fetch(`${apiUrl}/users/search`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        let errorResponse;
        try {
            errorResponse = await response.json();
        } catch (e) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        throw new Error(errorResponse.message || 'Error en la solicitud');
    }

    const recovery = await response.json();

    return recovery;
} catch (error) {
    console.log("Error recovery password.", error)
}
}

export const fetchUsers = async () => {
    const response = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
}

export const fetchAddUser = async (data: IAddFriendForm) => {
    const {userId, friendId, token} = data
    // no se de por donde le paso el userId
    const response = await fetch(`${apiUrl}/users/addfriend`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({friendId})
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
} 