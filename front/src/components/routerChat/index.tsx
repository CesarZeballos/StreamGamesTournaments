
import { ChatBoxglobal } from "../chatBoxGlobal";
import { ChatSelector } from "../chatSelector";



export const RouterChat = () => {
    return (
        <div className="grid grid-cols-4">
            <ChatSelector />
            <ChatBoxglobal />
        </div>
    );
}