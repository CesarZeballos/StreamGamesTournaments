import { IAddTeamToTournament } from "@/interfaces/interfaceRedux"
import { IAddTeam } from "@/interfaces/interfaceTournaments"
import { fetchAddTeamToTournament, fetchPaymentTournament, fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
        const response = await fetchTournaments()
        return response
})

<<<<<<< HEAD
export const postTeamToTournamentSlice = createAsyncThunk('tournaments/postTeamToTournament', async (data: IAddTeamToTournament) => {
        console.log("esto se ejecuta", data)
        const response = await fetchPaymentTournament(data.teamData, data.token)
=======
export const addTeam = createAsyncThunk('tournaments/addTeam', async (data: IAddTeam) => {
        const response = await addTeamFetch(data)
>>>>>>> origin/cesar
        return response
})