'use client'
import { IFriend } from "@/interfaces/interfaceUser";
import { setFriend, setGlobalChat } from "@/redux/slices/chatSlice";
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner";


export const ChatSelector = () => {
    const dispatch = useDispatch<AppDispatch>();
    const friends = useSelector((state: RootState) => state.user.user?.friends);

    const [friendsList, setFriendsList] = useState<IFriend[]>([]);

    useEffect(() => {
        if (friends) {
            setFriendsList(friends);
        }
    }, [friends])
    
    const selectFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { value } = event.currentTarget;
        const friend = friendsList.find(friend => friend.id === value);
        if (friend) {
            dispatch(setFriend(friend));
        } else {
            toast.error("Friend not found", { 
                position: "top-right",
                duration: 1500});
        }
    }

    const selectGlobalChat = () => {
        dispatch(setGlobalChat());
    }
    return (
        <div className="col-span-1">
            <h1 className="heading5 text-lightViolet mb-4">Chat List</h1>
            <div className="flex flex-col gap-1">
                <button className="buttonPrimary" onClick={selectGlobalChat}>Global Chat</button>
                {
                    friendsList?.map((friend) => (
                        <button className="buttonSecondary" 
                        key={friend.id} 
                        value={friend.id}
                        onClick={selectFriend}
                        >{friend.nickname}</button>
                    ))
                }
            </div>
        </div>
    )
}