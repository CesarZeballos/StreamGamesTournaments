import React, { useState, useRef, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import { fetchChatBot } from "@/utils/fetchUserActions";

const chatBot = async (params: string): Promise<string | undefined> => {
    try {
        const response = await fetchChatBot(params)
        return response 
    } catch (error) {
        console.log(error)
    }    
}

export const ChatBot: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<string[]>(["Hello, how are you? I'm J.A.R.V.I.S. your virtual assistant. How can I help you?"]);
  const [inputMessage, setInputMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatRef, onClose]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value;
    setInputMessage(message);
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault()
   const response = await chatBot(inputMessage)
   if (response && response !== undefined) {
       setMessages([...messages, inputMessage, response]);
       setInputMessage("");
   }
  };

  return (
    <div ref={chatRef} className="fixed bottom-0 right-0 z-50 m-6 mr-24 w-80 h-96 bg-BGdarkness shadow-lg rounded-lg flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 p-2 bg-BGdark rounded text-white body">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-lightViolet flex flex-row justify-between">
        <input
          type="text"
          value={inputMessage}
          onChange={handleChange}
          className="inputMiddle"
        />

        <button 
          type="submit"
          className="iconButton">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};
