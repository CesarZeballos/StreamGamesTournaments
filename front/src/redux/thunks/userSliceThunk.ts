import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { ILoginForm } from "@/interfaces/interfaceUser"
import { loginUser, passwordRecovery, postUser } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterFormSlice) => {
    try {
        const response = await postUser(data)
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in user creation")
    }
})

export const loginSlice = createAsyncThunk('user/postLogin', async (data: ILoginForm) => {
    console.log("loginSlice", data)
    try {
        const response = await loginUser(data)
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in login")
    }
})

export const forgotPasswordSlice = createAsyncThunk('user/postForgotPassword', async (data: string) => {
    try {
        const response = await passwordRecovery(data)
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in password recovery")
    }
})