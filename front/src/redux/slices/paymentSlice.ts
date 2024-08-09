import { IBasicDataToTournamentRegister, IPaymentState } from "@/interfaces/interfaceRedux";
import { captureOrderSlice, createOrderSlice, getTournamentById, postTeamToTournamentSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddTeam, ITournament } from "@/interfaces/interfaceTournaments";
import { isoToDate } from "@/utils/formatDate";


const initialState: IPaymentState = {
    status: 'idle',
    error: null,
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
        setTeamName(state, action: PayloadAction<string>) {
            state.teamData.name = action.payload
        },
        setMembers(state, action: PayloadAction<string[]>) {
            state.teamData.users = action.payload
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
            toast.success(`Payment succeeded.`, {
                position: 'top-right',
                duration: 1500,
        })
            state.status = 'idle'
        })
        .addCase(postTeamToTournamentSlice.fulfilled, (state) => {
            toast.success(`CongraCongratulations! your team joined ${state.tournamentData.nameTournament}. good luck on ${isoToDate(state.tournamentData.startDate)}.`, {
                position: 'top-right',
                duration: 1500,
            })
            state.teamData = initialState.teamData
            state.tournamentData = initialState.tournamentData
        })

    }
})

export const { setBasicData, setTeamName, setMembers } = paymentSlice.actions
export default paymentSlice.reducer