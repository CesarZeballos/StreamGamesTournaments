import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { IAddFriendForm, ILoginForm } from "@/interfaces/interfaceUser"
import { fetchAddUser, loginUser, passwordRecovery, postUser } from "@/utils/fetchUser"
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
        const response = await loginUser({
            email: email,
            tokenFirebase: responseFirebase
        })
        
        return response
})

export const forgotPasswordSlice = createAsyncThunk('user/postForgotPassword', async (data: string) => {
        const response = await passwordRecovery(data)
        return response
})

export const addfriendSlice = createAsyncThunk('user/addFriend', async (data: IAddFriendForm) => {
        const response = await fetchAddUser(data)
        return response
})