import { IAddFriendForm, IDeletetournament, IFriendRequestProps } from "@/interfaces/interfaceUser"
import { fetchDeleteTournaments } from "@/utils/fetchTournaments"
import { fetchAceptFriend, fetchAddUser, fetchCheckViewTournament, fetchDeleteFriend, fetchRejectFriend } from "@/utils/fetchUserActions"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const addfriendSlice = createAsyncThunk('user/addFriend', async (data: IAddFriendForm) => {
    const response = await fetchAddUser(data)
    return response
})

export const removefriendSlice = createAsyncThunk('user/removeFriend', async (data: IFriendRequestProps) => {
    const response = await fetchDeleteFriend(data)
    console.log("thunk",response)
    return response
})

export const aceptFriendSlice = createAsyncThunk('user/aceptFriend', async (data: IFriendRequestProps) => {
    const response = await fetchAceptFriend(data)
    return response
})

export const rejectFriendSlice = createAsyncThunk('user/rejectFriend', async (data: IFriendRequestProps) => {
    const response = await fetchRejectFriend(data)
    return response
})

export const checkViewTournament = createAsyncThunk('user/checkViewTournament', async (data: IFriendRequestProps) => {
    const response = await fetchCheckViewTournament(data)
    return response 
})

export const deleteTournament = createAsyncThunk('user/deleteTournament', async (data: IDeletetournament) => {
    const response = await fetchDeleteTournaments(data)
    return response
})

