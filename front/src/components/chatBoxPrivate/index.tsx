'use client'
import { IFriend } from "@/interfaces/interfaceUser"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SendIcon from '@mui/icons-material/Send';
import { toast } from "sonner"
import io from "socket.io-client"
import { IMessage } from "@/interfaces/interfaceRedux"
import { ChatMessage } from "../chatMessage"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const ChatBoxPrivate = () => {
    const socket = io(`${apiUrl}`);
    const [historialChat, setHistorialChat] = useState<IMessage[]>([])
    const [receiverChat, setRecibedChat] = useState<IFriend>({} as IFriend)
    const [messageInput, setMessageInput] = useState("")

    const recibed = useSelector((state: RootState) => state.chat.recibed)
    // const chat = useSelector((state: RootState) => state.chat.chat)
    const user = useSelector((state: RootState) => state.user.user)
    const globalChat = useSelector((state: RootState) => state.chat.globalChat)

    // SOCKET CONFIG
    // escuchanndo mensajes
    useEffect(() => {
        // Escuchar mensajes privados
        socket.on('privateMessage', (message) => {
            console.log('Private message received:', message);
            // Actualizar la interfaz de usuario
        });
    }, [socket])

    useEffect(() => {
        setRecibedChat(recibed)
    }, [recibed])
    
    // Enviar mensaje privado
    const sendPrivateMessage = (senderId: string, receiverId: string, content: string) => {
        socket.emit('sendPrivateMessage', { senderId, receiverId, content });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setMessageInput(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(messageInput === "") {
            toast.error("message is required", {
                position: "top-right",
                duration: 1500
            })
        } else if (user) {
                const senderId = user.nickname
                const content = messageInput
                    const receiverId = receiverChat.nickname
                    sendPrivateMessage(senderId, receiverId, content)
                console.log("estas chateando con", receiverChat, "y el mensaje es", messageInput)
                setMessageInput("")
            }
    }

    return (
        <div className="col-span-3 grid grid-cols-3">
            <div className="col-span-2 flex flex-col items-center">
                <h1 className="heading5 text-white">conversation with {receiverChat.nickname}</h1>
                <div className="flex flex-col gap-2 w-full h-full">
                    {historialChat.map((message) => (
                        <ChatMessage key={message.content} nickname={message.nickname} content={message.content} date={message.date}/>
                    ))}
                </div>
                <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    placeholder="Type message" 
                    className="input" 
                    value={messageInput}
                    onChange={handleChange}/>
                    <button className="iconButton w-fit"><SendIcon/></button>
                </form>
            </div>
        </div>
    )
}


