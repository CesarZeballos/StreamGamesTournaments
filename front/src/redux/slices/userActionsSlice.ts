import { IUserActionsState } from "@/interfaces/interfaceRedux";
import { createSlice } from "@reduxjs/toolkit";
import { addfriendSlice, removefriendSlice } from "../thunks/userActionsSliceThunk";
import { toast } from "sonner";
import { loginSlice, reloadUserSlice, upgradeUserSlice } from "../thunks/userSliceThunk";

const initialState: IUserActionsState = {
    status: 'idle',
    error: null
}

const userActionSlice = createSlice({
    name: "userActions",
    initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder
        // SETEO DE NOTIFICACIONES

        .addCase(loginSlice.fulfilled, (state, action) => {
            if (action.payload.token) {
                //que se actualicen las notificaciones
              } else return
            })

        .addCase(reloadUserSlice.fulfilled, (state, action) => {
            if (action.payload) {
                //que se actualicen las notifiaciones
            } else return
          })

        // ADD FRIEND
        .addCase(addfriendSlice.fulfilled, (state, action) => {
        toast.success('friend request sent', {
            position: 'top-right',
            duration: 1500,
            })
        })
        .addCase(addfriendSlice.rejected, (state, action) => {
        toast.error('friend request not sent', {
            position: 'top-right',
            duration: 1500,
            })
        })

        // DELETE FRIEND

        .addCase(removefriendSlice.fulfilled, (state, action) => {
        toast.success('friend removed', {
            position: 'top-right',
            duration: 1500,
            })
        })
        .addCase(removefriendSlice.rejected, (state, action) => {
        toast.error(`something went wrong, we couldn't delete your friend. try again in a few minutes.`, {
            position: 'top-right',
            duration: 1500,
            })
        })
    }
})