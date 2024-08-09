import { IUserActionsState } from "@/interfaces/interfaceRedux";
import { createSlice } from "@reduxjs/toolkit";
import { addfriendSlice, checkViewTournament, removefriendSlice } from "../thunks/userActionsSliceThunk";
import { toast } from "sonner";
import { loginSlice, reloadUserSlice } from "../thunks/userSliceThunk";

const initialState: IUserActionsState = {
    addFriendStatus: 'idle',
    removeFriendStatus: 'idle',
    error: null
}

const userActionSlice = createSlice({
    name: "userActions",
    initialState,
    reducers: {}, extraReducers: (builder) => {
        builder
        // SETEO DE NOTIFICACIONES

        .addCase(loginSlice.fulfilled, (state, action) => {
            if (action.payload.token) {
                state.addFriendStatus = 'idle'
                state.removeFriendStatus = 'idle'
              } else return
            })

        .addCase(reloadUserSlice.fulfilled, (state, action) => {
            if (action.payload) {
                state.addFriendStatus = 'idle'
                state.removeFriendStatus = 'idle'
            } else return
          })

        // ADD FRIEND
        .addCase(addfriendSlice.fulfilled, (state) => {
        state.addFriendStatus = 'succeeded'
        toast.success('friend request sent', {
            position: 'top-right',
            duration: 1500,
            })
        })
        .addCase(addfriendSlice.rejected, (state) => {
        state.addFriendStatus = 'failed'
        toast.error('friend request not sent', {
            position: 'top-right',
            duration: 1500,
            })
        })

        // DELETE FRIEND

        .addCase(removefriendSlice.fulfilled, (state) => {
        state.removeFriendStatus = 'succeeded'
        toast.success('friend removed', {
            position: 'top-right',
            duration: 1500,
            })
        })
        .addCase(removefriendSlice.rejected, (state) => {
        state.removeFriendStatus = 'failed'
        toast.error(`something went wrong, we couldn't delete your friend. try again in a few minutes.`, {
            position: 'top-right',
            duration: 1500,
            })
        })

        // CHECK VIEW TOURNAMENTS
        .addCase(checkViewTournament.fulfilled, (state) => {
            toast.success('viewed tournament', {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(checkViewTournament.rejected, (state) => {
            toast.error(`something went wrong, we couldn't view your tournament. try again in a few minutes.`, {
                position: 'top-right',
                duration: 1500,
            })
        })
    }
})

export const { } = userActionSlice.actions
export default userActionSlice.reducer