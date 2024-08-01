import { fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
    try {
        const response = await fetchTournaments()
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in get tournaments")
    }
})
