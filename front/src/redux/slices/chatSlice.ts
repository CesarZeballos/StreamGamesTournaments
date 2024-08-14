import { IChatState, IMessage } from "@/interfaces/interfaceRedux"
import { IFriend } from "@/interfaces/interfaceUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setGlobal } from "next/dist/trace"


const initialState: IChatState = {
    chat: [] as IMessage[],
    recibed: {} as IFriend,
    globalChat: "Global chat",
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setGlobalChat(state) {
            state.globalChat = initialState.globalChat
            state.recibed = initialState.recibed
        },
        setFriend(state, action: PayloadAction<IFriend>) {
            state.globalChat = ""
            state.recibed = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
    }

})

export const {setFriend, setGlobalChat} = chatSlice.actions
export default chatSlice.reducer

