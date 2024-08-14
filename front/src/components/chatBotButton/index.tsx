'use client';
import { Fab } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useState } from "react";
import { ChatBot } from "../chatBot";


export const ChatBotButton: React.FC = () =>  {
    const [openChat, setOpenChat] = useState(false);

    const handleChange = () => {
        setOpenChat(true);
    }
    const handleClose = () => {
        setOpenChat(false);
      };
  return (
    <div className="fixed bottom-9 right-9 z-40">
        {!openChat && 
            <Fab size="medium" color="info" onClick={handleChange}>
                <SmartToyIcon sx={{ mr: 0 }} />
            </Fab>
        }
        
      {openChat && <ChatBot onClose={handleClose} />}
    </div>
  );
}
