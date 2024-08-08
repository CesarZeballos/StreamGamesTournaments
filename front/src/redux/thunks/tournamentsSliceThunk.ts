import { ITournamentPayment } from "@/interfaces/interfaceRedux"
import { IAddTeam } from "@/interfaces/interfaceTournaments"
import { fetchAddTeamToTournament, fetchCapturePaymentTournament, fetchPaymentTournament, fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "sonner"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
        const response = await fetchTournaments()
        return response
})

export const createOrderSlice = createAsyncThunk('tournaments/createPaymentToTournament', async (data: ITournamentPayment) => {
        // mandar solo el token y el tournamentId
        const response = await fetchPaymentTournament(data)
        return response
})

export const captureOrderSlice = createAsyncThunk('tournaments/capturePaymentToTournament', async (data: string) => {
        // mandar solamente el orderId
        const response = await fetchCapturePaymentTournament(data)
        return response
})

export const postTeamToTournamentSlice = createAsyncThunk('tournaments/postTeamToTournament', async (data: IAddTeam) => {
        // mandar solo el token y el tournamentId y la data del team
        const response = await fetchAddTeamToTournament(data)
        return response
})