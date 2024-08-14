import { ITournamentPayment } from "@/interfaces/interfaceRedux"
import { IAddTeam, ITournamentPost } from "@/interfaces/interfaceTournaments"
import { fetchAddTeamToTournament, fetchCapturePaymentTournament, fetchPaymentTournament, fetchPostTournemnt, fetchTournamentById, fetchTournaments } from "@/utils/fetchTournaments"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { AppDispatch } from "../store"
import { setCancelRegisterToTournament } from "../slices/paymentSlice"

export const getTournamentsSlice = createAsyncThunk('tournaments/getTournaments', async () => {
        const response = await fetchTournaments()
        return response
})

export const getTournamentById = createAsyncThunk('tournaments/getTournamentById', async (data: string) => {
        const response = await fetchTournamentById(data)
        return response
})

export const createOrderSlice = createAsyncThunk('tournaments/createPaymentToTournament', async (data: ITournamentPayment) => {
        const response = await fetchPaymentTournament(data)
        return response
})

export const captureOrderSlice = createAsyncThunk('tournaments/capturePaymentToTournament', async (data: string) => {
        const response = await fetchCapturePaymentTournament(data)
        return response
})

export const postTeamToTournamentSlice = createAsyncThunk('tournaments/postTeamToTournament', async (data: IAddTeam) => {
        const response = await fetchAddTeamToTournament(data)
        return response
})

export const postTournamentSlice = createAsyncThunk('tournaments/post', async (data: {data: ITournamentPost, token: string}) => {
        const response = await fetchPostTournemnt(data)
        return response
})