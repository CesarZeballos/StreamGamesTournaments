import { IRegisterForm, IUser } from "@/interfaces/interfaceUser"
import { postUser } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const registerSlice = createAsyncThunk('user/postRegister', async (data: IRegisterForm) => {
    try {
        const response = await postUser(data)
        console.log("thunkresponse", response.data)
        return response.data
    } catch (error: any) {
        throw Error(error.response.data.message || "Error in user creation")
    }
})

export default registerSlice
