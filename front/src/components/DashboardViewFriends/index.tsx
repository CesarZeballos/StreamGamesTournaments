'use client'
import { IFriend, IUser } from "@/interfaces/interfaceUser";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

//icons
import ChatIcon from '@mui/icons-material/Chat';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { setView } from "@/redux/slices/dashboardSlice";
import { removefriendSlice } from "@/redux/thunks/userActionsSliceThunk";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const DashboardViewFriends = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);
    const friends = user?.friends || [] as IFriend[];

    const [friendList, setFriendList] = useState<IFriend[]>([]);

    useEffect(() => {
        if(!friends) return
        setFriendList(friends)
    }, [])

    const deleteFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget
        console.log(name)
        toast(`Are you sure you want to eliminate ${name.toString()}?`, {
            position: 'top-right',
            action: {
              label: 'yes, remove this friend',
              onClick: () => {
                  dispatch(removefriendSlice({
                      id: value,
                      token: token! 
                  }))
                  dispatch(reloadUserSlice({email: user?.email!, tokenFirebase: user?.tokenFirebase}))
                  setFriendList(friendList.filter((friend) => friend.nickname !== name))
              }
            },
          })
    }

    const newChat = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
    }

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                <h1 className="heading5 text-lightViolet">Your friends</h1>
                <table className="mt-1 w-full">
                    <thead className="tableHeader flex flex-row justify-around">
                        <th className="text-center">Nickname</th>
                        {/* <th className="text-center">Chat</th> */}
                        <th className="text-center">Delete</th>
                    </thead>
                    <tbody className="tableBody flex flex-col gap-2">
                        {friendList.map((user) => (
                            <tr key={user.id} className="flex flex-row justify-around">
                                <td>{user.nickname}</td>
                                {/* <td className="text-center">
                                    <button className="iconButton" value={user.id} name={user.nickname} onClick={newChat}>
                                    <ChatIcon />
                                    </button>
                                    </td> */}
                                <td className="text-center">
                                    <button className="iconButton" value={user.id} name={user.nickname} onClick={deleteFriend}>
                                        <PersonRemoveIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {friendList.length === 0 && (
                    <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                        <p className="body text-white">{"You don't have any friends"}</p>
                        <button className="buttonPrimary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
                    </div>
                )}
            </div>
        </div>
    )
}