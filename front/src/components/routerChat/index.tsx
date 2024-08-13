
import { ChatBoxglobal } from "../chatBoxGlobal";
import { ChatSelector } from "../chatSelector";
import { RootState } from "@/redux/store";



export const RouterChat = () => {
    const globalChat = useSelector((state: RootState) => state.chat.globalChat)
    return (
        <div className="grid grid-cols-4">
            <ChatSelector />
            <ChatBoxglobal />
        </div>
    );
}