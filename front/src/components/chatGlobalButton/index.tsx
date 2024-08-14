'use client';
import { useState } from "react";
import { ChatBoxglobal } from "../chatBoxGlobal";
import ChatIcon from '@mui/icons-material/Chat';

export const ChatGlobalButton: React.FC = () =>  {
    const [openChat, setOpenChat] = useState(false);

    const handleChange = () => {
        setOpenChat(true);
    }
    const handleClose = () => {
        setOpenChat(false);
      };
  return (
    <div className="fixed bottom-9 right-0 z-50">
        {!openChat && 
        <button className="buttonChat" onClick={handleChange}>
            <ChatIcon  />
        </button>
        }
        
      {openChat && <ChatBoxglobal onClose={handleClose} />}
    </div>
  );  
}
