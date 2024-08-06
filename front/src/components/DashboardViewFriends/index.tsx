'use client'
import { IUser } from "@/interfaces/interfaceUser";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

//icons
import ChatIcon from '@mui/icons-material/Chat';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { setView } from "@/redux/slices/dashboardSlice";

export const DashboardViewFriends = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const friends = user?.friends || [] as IUser[];

    const deleteFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
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
                        <th className="text-center">Chat</th>
                        <th className="text-center">Delete</th>
                    </thead>
                    {friends.length === 0 ? (
                        <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                            <p className="body text-white">{"You don't have any friends"}</p>
                            <button className="buttonPrimary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
                        </div>
                    ) : 
                    (<tbody className="tableBody flex flex-col gap-2">
                        {friends.map((user) => (
                            <tr key={user.id} className="flex flex-row justify-around">
                                <td>{user.nickname}</td>
                                <td className="text-center">
                                    <button className="iconButton" value={user.id} onClick={newChat}>
                                        <ChatIcon />
                                    </button>
                                </td>
                                <td className="text-center">
                                    <button className="iconButton" value={user.id} onClick={deleteFriend}>
                                        <PersonRemoveIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>)
                }
                </table>
            </div>
        </div>
    )
}