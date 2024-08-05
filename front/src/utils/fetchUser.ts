import { IAddFriendForm, ILoginDataBase, ILoginForm, IRegisterForm, IUpgradeUser } from "@/interfaces/interfaceUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function postUser(data:IRegisterForm) {
    const dataFetch = JSON.stringify(data)
    console.log("dataFetch", dataFetch)
    try {
        const response = await fetch("http://localhost:3001/auth/signup", {
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
        const response = await fetch("http://localhost:3001/auth/signin", {
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
    const response = await fetch("http://localhost:3001/users/search", {
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
    const response = await fetch("http://localhost:3001/users", {
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

export const banUser = async (id: string) => {
    const response = await fetch(`http://localhost:3001/users/delete?id=${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    });
    
    if (!response.ok) {
    throw new Error('Failed to disable user');
    }
    
    return response.json();
};

export const fetchAddUser = async (data: IAddFriendForm) => {
    const {userId, friendId, token} = data
    const response = await fetch(`${apiUrl}/users/add-friend`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId, 
            friendId: friendId
        })
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
} 

export const fetchUgradeUser = async (data: IUpgradeUser) => {
    const {id, token} = data
    const response = await fetch(`${apiUrl}/users/upgradeUser`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: id
        })
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
}