import { IAddFriendForm } from "@/interfaces/interfaceUser"
import { fetchAddUser } from "@/utils/fetchUserActions"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const addfriendSlice = createAsyncThunk('user/addFriend', async (data: IAddFriendForm) => {
    const response = await fetchAddUser(data)
    console.log("data", data, "response", response)
    return response
})