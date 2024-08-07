import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { ILoginDataBase, ILoginForm, IUpgradeUser } from "@/interfaces/interfaceUser"
import { fetchUgradeUser, loginUser, passwordRecovery, postUser } from "@/utils/fetchUser"
import { singInFirebaseWithEmailAndPassword, singUpFirebaseWithEmailAndPassword } from "@/utils/firebase/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterFormSlice) => {
    const { nickname, email, password, birthdate } = data

        const responseFirebase = await singUpFirebaseWithEmailAndPassword(data)
        const response = await postUser({ 
            nickname: nickname,
            email: email,
            password: password,
            birthdate: birthdate,
            tokenFirebase: responseFirebase
        })
        return response
})

export const loginSlice = createAsyncThunk('user/postLogin', async (data: ILoginForm) => {
    const { email, password } = data
    const responseFirebase = await singInFirebaseWithEmailAndPassword(data)
    if(!responseFirebase) return

    try {
        const response = await loginUser({
            email: email,
            tokenFirebase: responseFirebase
        })

        return response
    } catch (error) {
        console.log("error", error)
        return error
    }
        
})

export const reloadUserSlice = createAsyncThunk('user/reloadUser', async (data: ILoginDataBase) => {
    const { email, tokenFirebase } = data

    const response = await loginUser({
        email: email,
        tokenFirebase: tokenFirebase
    })
    
    return response
})

export const forgotPasswordSlice = createAsyncThunk('user/postForgotPassword', async (data: string) => {
        const response = await passwordRecovery(data)
        return response
})

export const upgradeRequestUserSlice = createAsyncThunk('user/upgradeUser', async (data: IUpgradeUser) => {
        const response = await fetchUgradeUser(data)
        return response
})