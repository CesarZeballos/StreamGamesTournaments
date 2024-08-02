import { IAddTeam } from "@/interfaces/interfaceTournaments"
import { fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
        const response = await fetchTournaments()
        return response
})
