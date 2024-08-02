import { fetchUsers } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getUsersSlice = createAsyncThunk('auxiliar/getUsers', async () => {
    const response = await fetchUsers()
    return response
})