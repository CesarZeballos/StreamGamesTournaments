import { IAddTeam } from "@/interfaces/interfaceTournaments"
import { addTeamFetch, fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
        const response = await fetchTournaments()
        return response
})

export const addTeam = createAsyncThunk('tournaments/addTeam', async (data: IAddTeam) => {
        const response = await addTeamFetch(data)
        return response
})