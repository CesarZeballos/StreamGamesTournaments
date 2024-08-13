import { IAddFriendForm, ILoginDataBase, ILoginForm, IRegisterForm, IUpgradeUser } from "@/interfaces/interfaceUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function postUser(data:IRegisterForm) {
    const dataFetch = JSON.stringify(data)
    try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: dataFetch
        })
        const loginData = await response.json()
        console.log("loginData", loginData)

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
        return error
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

export const banUser = async (id: string) => {
    const response = await fetch(`${apiUrl}/users/delete?id=${id}`, {
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

export const fetchUgradeUser = async (data: IUpgradeUser) => {
    console.log("data", data)
    const {id, token} = data
    const response = await fetch(`${apiUrl}/admin/role/${id}`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            role: "organizer"
        })
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
}