'use client'
import { useSelector } from "react-redux";
import { ChatBoxGlobal } from "../chatBoxGlobal";
import { ChatBoxPrivate } from "../chatBoxPrivate";
import { ChatSelector } from "../chatSelector";
import { RootState } from "@/redux/store";



export const RouterChat = () => {
    const globalChat = useSelector((state: RootState) => state.chat.globalChat)
    return (
        <div className="grid grid-cols-4">
            <ChatSelector />
            {globalChat === "Global chat" ? <ChatBoxGlobal /> : <ChatBoxPrivate />}
        </div>
    );
}