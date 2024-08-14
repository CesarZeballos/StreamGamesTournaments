'use client';
import { useState } from "react";
import { ChatBoxglobal } from "../chatBoxGlobal";
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ChatGlobalButton: React.FC = () =>  {
    const [openChat, setOpenChat] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();

    const handleChange = () => {
        if (user?.nickname === undefined) {
          toast.info("You must be logged in to access the global chat", {
            position: "top-right",
            duration: 1500,
            action: {
              label: "ok",
              onClick: () => {
                router.push("/login");
              },
            }
          })
        } else {
          setOpenChat(true);
        }
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
