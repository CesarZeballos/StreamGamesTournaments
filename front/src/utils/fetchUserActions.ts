import { IAddFriendForm, IFriendRequest, IFriendRequestProps } from "@/interfaces/interfaceUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchAddUser = async (data: IAddFriendForm) => {
    const {userId, friendId, token} = data
    const response = await fetch(`${apiUrl}/users/sendfriend`, {
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

export const fetchDeleteFriend = async (data: IFriendRequestProps) => {
    const {id, token} = data
    console.log("data", data)
    const response = await fetch(`${apiUrl}/users/remove-friend/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
    const userData = await response.json();
    console.log("response fetch", userData)
    console.log("userData", response)
    return userData;
} 

export const fetchAceptFriend = async (data: IFriendRequestProps) => {
    const {id, token} = data
    const response = await fetch(`${apiUrl}/users/add-friend/${id}`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
    return await response.json()
}

export const fetchRejectFriend = async (data: IFriendRequestProps) => {
    //aca va el Id de la relacion, que es el que no dice frindId
    const {id, token} = data
    const response = await fetch(`${apiUrl}/users/sendfriend/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error(`Error adding friend: ${response.statusText}`);
    }
    return await response.json()
}