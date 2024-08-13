import { ITournament, ITournamentPost } from "@/interfaces/interfaceTournaments";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadFileSlice } from "../thunks/auxiliarSliceThunk";
import { toast } from "sonner";
import { IBasicTournamentFormProps, IFirstStep, IOrganizerState, ISecondStep } from "@/interfaces/interfaceRedux";
import { postTournamentSlice } from "../thunks/tournamentsSliceThunk";


const initialState: IOrganizerState = {
    step: "firstStep",
    tournament: {
        nameTournament: "",
        category: "",
        gameId: "",
        startDate: "",
        urlAvatar: "https://res.cloudinary.com/dofwlsemg/image/upload/v1723001828/niyic87vymj5vqitz7my.jpg",
        membersNumber: 0,
        maxTeams: 0,
        price: 0,
        awards: [],
        description: "",
        organizerId: "",
    },
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
            state.step = "secondStep"
            state.tournament.nameTournament = action.payload.nameTournament
            state.tournament.category = action.payload.category
            state.tournament.gameId = action.payload.gameId
            state.tournament.startDate = new Date(action.payload.startDate).toISOString()
            state.tournament.urlAvatar = action.payload.urlAvatar
        },
        setSecondStep(state, action: PayloadAction<ISecondStep>) {
            state.step = "thirdStep"
            state.tournament.membersNumber = action.payload.membersNumber
            state.tournament.maxTeams = action.payload.maxTeams
            state.tournament.price = action.payload.price
            state.tournament.awards = action.payload.awards
            state.tournament.description = action.payload.description
        },
        setThirdStep(state){
            state.step = "finishStep"
        }
    }, extraReducers: (builder) => {
        builder
        // UPLOAD FILE
        .addCase(uploadFileSlice.fulfilled, (state, action) => {
            state.step = "finishStep"
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
        .addCase(postTournamentSlice.fulfilled, (state) => {
            state.step = initialState.step
            state.tournament = initialState.tournament
            state.token = initialState.token
            toast.success("Tournament created", {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(postTournamentSlice.rejected, (state) => {
            toast.error("Something went wrong", {
                position: 'top-right',
                duration: 1500,
            })
        })

    }
})

export const { setBasicData, setFirstStep, setSecondStep, setThirdStep } = organizeSlice.actions
export default organizeSlice.reducer