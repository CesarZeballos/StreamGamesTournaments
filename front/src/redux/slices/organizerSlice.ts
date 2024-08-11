import { ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadFileSlice } from "../thunks/auxiliarSliceThunk";
import { toast } from "sonner";
import { IBasicTournamentFormProps, IFirstStep, IOrganizerState, ISecondStep } from "@/interfaces/interfaceRedux";


const initialState: IOrganizerState = {
    step: "firstStep",
    tournament: {} as ITournamentPost,
    token: ''
}


const organizeSlice = createSlice({
    name: "organize",
    initialState,
    reducers: {
        setBasicData(state, action: PayloadAction<IBasicTournamentFormProps>) {
            state.tournament.organizerId = action.payload.organizerId
            state.token = action.payload.token
        },
        setFirstStep(state, action: PayloadAction<IFirstStep>) {
            state.tournament.nameTournament = action.payload.nameTournament
            state.tournament.startDate = action.payload.startDate
            state.tournament.category = action.payload.category
            state.tournament.gameId = action.payload.gameId
            state.tournament.urlAvatar = action.payload.urlAvatar
        },
        setSecondStep(state, action: PayloadAction<ISecondStep>) {
            state.step = "secondStep"
            state.tournament.membersNumber = action.payload.membersNumber
            state.tournament.maxTeam = action.payload.maxTeam
            state.tournament.price = action.payload.price
            state.tournament.award = action.payload.award
            state.tournament.description = action.payload.description
        },
        setThirdStep(state){
            state.step = "thirdStep"
        }
    }, extraReducers: (builder) => {
        builder
        // UPLOAD FILE
        .addCase(uploadFileSlice.fulfilled, (state, action) => {
            state.tournament.urlAvatar = action.payload
            toast.success("File uploaded", {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(uploadFileSlice.rejected, (state) => {
            toast.error("Something went wrong", {
                position: 'top-right',
                duration: 1500,
            })
        })

    }
})

export const { setBasicData, setFirstStep, setSecondStep, setThirdStep } = organizeSlice.actions
export default organizeSlice.reducer