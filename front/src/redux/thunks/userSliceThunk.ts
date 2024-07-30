import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { ILoginForm } from "@/interfaces/interfaceUser"
import { fetchUserById, loginUser, passwordRecovery, postUser } from "@/utils/fetchUser"
import { singInFirebaseWithEmailAndPassword, singUpFirebaseWithEmailAndPassword } from "@/utils/firebase/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterFormSlice) => {
    const { nickName, email, password, birthDate } = data
    try {
        const responseFirebase = await singUpFirebaseWithEmailAndPassword(data)
        const response = await postUser({ 
            nickName: nickName,
            email: email,
            password: password,
            birthDate: birthDate,
            tokenFirebase: responseFirebase
        })
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in user creation")
    }
})

export const loginSlice = createAsyncThunk('user/postLogin', async (data: ILoginForm) => {
    const { email, password } = data

    try {
        const responseFirebase = await singInFirebaseWithEmailAndPassword(data)
        if(!responseFirebase) return
        const response = await loginUser({
            email: email,
            tokenFirebase: responseFirebase
        })

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

export const reloadUSerDataSlice = createAsyncThunk('user/reloadUserData', async (id: string | undefined) => {
    try {
        if(!id) return
        const response = await fetchUserById(id)
        return response
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in login")
    }
})