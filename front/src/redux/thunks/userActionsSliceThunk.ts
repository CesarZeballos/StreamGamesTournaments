import { IAddFriendForm } from "@/interfaces/interfaceUser"
import { fetchAddUser, fetchDeleteFriend } from "@/utils/fetchUserActions"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const addfriendSlice = createAsyncThunk('user/addFriend', async (data: IAddFriendForm) => {
    const response = await fetchAddUser(data)
    return response
})

export const removefriendSlice = createAsyncThunk('user/removeFriend', async (data: IAddFriendForm) => {
    const response = await fetchDeleteFriend(data)
    return response
})