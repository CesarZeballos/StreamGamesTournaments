import { ChatBox } from "../chatBox";
import { ChatSelector } from "../chatSelector";



export const RouterChat = () => {
    return (
        <div className="grid grid-cols-4">
            <ChatSelector />
            <ChatBox />
        </div>
    );
}