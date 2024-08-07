import { IPaymentState } from "@/interfaces/interfaceRedux";
import { captureOrderSlice, createOrderSlice } from "../thunks/tournamentsSliceThunk";
import { toast } from "sonner";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IPaymentState = {
    status: 'idle',
    error: null
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {}, extraReducers: (builder) => {
        builder
        .addCase(createOrderSlice.fulfilled, (state) => {
            state.status = 'succeeded'
            toast.success(`Payment succeeded. your team is registered`, {
                position: 'top-right',
                duration: 1500,
            })
        })
        .addCase(createOrderSlice.rejected, (state, action) => {
            state.status = 'failed'
            toast.error('payment not succeeded', {
                position: 'top-right',
                duration: 1500,
            })
        })
        // .addCase(captureOrderSlice.fulfilled, (state) => {
        //     //esto creo que no deberia hacer nada, porque no tiene nada que ver con el usuario
        //     //o es al revez, este es el que tiene que disparar el toast y decir que el pago fue exitoso... 
        //     state.status = 'idle'
        // })
    }
})

export const { } = paymentSlice.actions
export default paymentSlice.reducer