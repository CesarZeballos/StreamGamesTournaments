import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { ILoginForm } from "@/interfaces/interfaceUser"
import { loginUser, postUser } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterFormSlice) => {
    try {
        const response = await postUser(data)
        console.log("thunkresponseRegister", response.data)
        return response.data
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in user creation")
    }
})

export const loginSlice = createAsyncThunk('user/postLogin', async (data: ILoginForm) => {
    try {
        const response = await loginUser(data)
        console.log("thunkresponseLogin", response.data)
        return response.data
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in login")
    }
})