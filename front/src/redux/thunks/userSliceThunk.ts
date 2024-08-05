import { IRegisterFormSlice } from "@/interfaces/interfaceRedux"
import { IAddFriendForm, ILoginDataBase, ILoginForm, IUpgradeUser } from "@/interfaces/interfaceUser"
import { fetchAddUser, fetchUgradeUser, loginUser, passwordRecovery, postUser } from "@/utils/fetchUser"
import { singInFirebaseWithEmailAndPassword, singUpFirebaseWithEmailAndPassword } from "@/utils/firebase/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterFormSlice) => {
<<<<<<< HEAD
    const { nickname, email, password, birthdate } = data
=======
    const { nickName, email, password, birthDate } = data
>>>>>>> origin/cesar

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
<<<<<<< HEAD
})

export const reloadUserSlice = createAsyncThunk('user/reloadUser', async (data: ILoginDataBase) => {
    const { email, tokenFirebase } = data

    const response = await loginUser({
        email: email,
        tokenFirebase: tokenFirebase
    })
    
    return response
=======
>>>>>>> origin/cesar
})

export const forgotPasswordSlice = createAsyncThunk('user/postForgotPassword', async (data: string) => {
        const response = await passwordRecovery(data)
        return response
})

<<<<<<< HEAD
export const addfriendSlice = createAsyncThunk('user/addFriend', async (data: IAddFriendForm) => {
        const response = await fetchAddUser(data)
        console.log("data", data, "response", response)
        return response
})

export const upgradeUserSlice = createAsyncThunk('user/upgradeUser', async (data: IUpgradeUser) => {
        const response = await fetchUgradeUser(data)
=======
export const reloadUSerDataSlice = createAsyncThunk('user/reloadUserData', async (id: string | undefined) => {
        if(!id) return
        const response = await fetchUserById(id)
>>>>>>> origin/cesar
        return response
})