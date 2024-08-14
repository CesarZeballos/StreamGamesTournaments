'use client';
import { Fab } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';


export const ChatBotButton: React.FC = () =>  {
  return (
    <div className="fixed bottom-9 right-9 z-50">
      <Fab size="medium" color="info">
        <SmartToyIcon sx={{ mr: 0 }} />
      </Fab>
    </div>
  );
}
