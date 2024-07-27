import { IAddTeam } from "@/interfaces/interfaceTournaments"
import { addTeamFetch, fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
    try {
        const response = await fetchTournaments()
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in get tournaments")
    }
})

export const addTeam = createAsyncThunk('tournaments/addTeam', async (data: IAddTeam) => {
    try {
        const response = await addTeamFetch(data)
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in add team in tournament")
    }
})