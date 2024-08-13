'use client'
import { IFriend } from "@/interfaces/interfaceUser"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SendIcon from '@mui/icons-material/Send';
import { toast } from "sonner"
import io, { Socket } from "socket.io-client"
import { IMessage } from "@/interfaces/interfaceRedux"
import { ChatMessage } from "../chatMessage"

let socket: Socket | null = null;

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!socket) {
    socket = io(`${apiUrl}`);
}

export const ChatBoxPrivate = () => {
    const [historialChat, setHistorialChat] = useState<IMessage[]>([])
    const [receiverChat, setRecibedChat] = useState<IFriend>({} as IFriend)
    const [messageInput, setMessageInput] = useState("")

    const recibed = useSelector((state: RootState) => state.chat.recibed)
    // const chat = useSelector((state: RootState) => state.chat.chat)
    const user = useSelector((state: RootState) => state.user.user)
    const globalChat = useSelector((state: RootState) => state.chat.globalChat)

    // SOCKET CONFIG
    // inicia el chat con el "amigo"
    useEffect(() => {
        if (user && recibed) {
            // Emitir el evento 'joinChat' cuando se selecciona un usuario para chatear
            socket.emit('joinChat', {
                user1Id: user.id,  // Asegúrate de usar el ID del usuario
                user2Id: recibed.friendId,  // Asegúrate de usar el ID del receptor
            });
            console.log("entra al socketEmit, user1Id y user2Id", user.id, recibed.friendId)
        }
    }, [recibed, user]);
    // seteando el historial de chat
    useEffect(() => {
        socket.on('loadPreviousMessages', (messages: IMessage[]) => {
            setHistorialChat(messages);
            console.log("entra al socketOn")
            console.log('Loaded previous messages:', messages);
        });
    
        return () => {
            socket.off('loadPreviousMessages');
        }
    }, [recibed]);

    useEffect(() => {
        setRecibedChat(recibed)
    }, [recibed])
    
    // Enviar mensaje privado
    const sendPrivateMessage = (senderId: string, receiverId: string, content: string) => {
        socket.emit('sendPrivateMessage', { senderId, receiverId, content });
        console.log("entra al socketEmit")
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
                const senderId = user.id
                const content = messageInput
                const receiverId = receiverChat.friendId
                sendPrivateMessage(senderId, receiverId, content)

                setHistorialChat(prevMessages => [...prevMessages, {
                    id: Date.now().toString(),  // Temporal
                    nickname: user.nickname,
                    post: content,
                    createdAt: new Date().toISOString(),  // Temporal
                }]);

                
                setMessageInput("")
            }
    }

    return (
        <div className="col-span-3 grid grid-cols-3">
            <div className="col-span-2 flex flex-col items-center">
                <h1 className="heading5 text-white">conversation with {receiverChat.nickname}</h1>
                <div className="flex flex-col gap-2 w-full h-full">
                    {historialChat.map((message) => (
                        <ChatMessage key={message.id} id={message.id} nickname={message.nickname} post={message.post} createdAt={message.createdAt}/>
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


