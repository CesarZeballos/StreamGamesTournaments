import { IBasicDataToTournamentRegister, IPaymentState, ITeamDataToTournamentRegister } from "@/interfaces/interfaceRedux";
import { captureOrderSlice, createOrderSlice, getTournamentById, postTeamToTournamentSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { isoToDate } from "@/utils/formatDate";


const initialState: IPaymentState = {
    status: 'idle',
    error: null,
    step: "team",
    teamData: {
        tournamentId: '',
        name: '',
        organizerId: '',
        token: '',
        users: []
    },
    tournamentData: {} as ITournament
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setBasicData(state, action: PayloadAction<IBasicDataToTournamentRegister>) {
            state.teamData.organizerId = action.payload.organizerId
            state.teamData.token = action.payload.token
        },
        setTeamData(state, action: PayloadAction<ITeamDataToTournamentRegister>) {
            state.teamData.name = action.payload.name
            state.teamData.users = action.payload.users
            state.teamData.users.push(state.teamData.organizerId)
            state.step = "payment"
        },
        setStepPayment(state, action: PayloadAction<string>) {
            state.step = action.payload
        },
        setCancelRegisterToTournament(state) {
            state.tournamentData = initialState.tournamentData
            state.step = initialState.step
            state.teamData = initialState.teamData
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(getTournamentById.fulfilled, (state, action: PayloadAction<ITournament>) => {
            state.tournamentData = action.payload
            state.teamData.tournamentId = action.payload.id
        })
        .addCase(getTournamentById.rejected, (state) => {
            toast.error('error to get tournament', {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(createOrderSlice.fulfilled, (state) => {
            state.status = 'succeeded'
        })
        .addCase(createOrderSlice.rejected, (state) => {
            state.status = 'failed'
            toast.error('payment not succeeded', {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(captureOrderSlice.fulfilled, (state) => {
            state.status = 'succeeded'
            toast.success(`Payment succeeded.`, {
                position: 'top-right',
                duration: 1500,
            })
            state.status = 'idle'
        })
        .addCase(postTeamToTournamentSlice.fulfilled, (state) => {
            state.step = "finish"
            toast.success(`CongraCongratulations! your team joined ${state.tournamentData.nameTournament}. good luck on ${isoToDate(state.tournamentData.startDate)}.`, {
                position: 'top-right',
                duration: 1500,
            })
        })

    }
})

export const { setBasicData, setTeamData, setStepPayment, setCancelRegisterToTournament } = paymentSlice.actions
export default paymentSlice.reducer