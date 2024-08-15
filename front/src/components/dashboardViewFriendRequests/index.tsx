import { AppDispatch, RootState } from "@/redux/store";
import { aceptFriendSlice, rejectFriendSlice } from "@/redux/thunks/userActionsSliceThunk";
import { useDispatch, useSelector } from "react-redux";

//icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { useEffect, useState } from "react";
import { setView } from "@/redux/slices/dashboardSlice";
import { toast } from "sonner";
import { IFriendRequest } from "@/interfaces/interfaceUser";

export const DashboardViewFriendRequests: React.FC = () => {
    const friendRequests = useSelector((state: RootState) => state.user.user?.receivedFriendRequests);
    const {email, tokenFirebase} = useSelector((state: RootState) => state.user.user!);
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch<AppDispatch>();

    const [request, setRequest] = useState<IFriendRequest[]>([]);

    useEffect(() => {
        if (!friendRequests) return;
        setRequest(friendRequests);
    }, []);

    const acceptFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget;
        dispatch(aceptFriendSlice({id: value, token: token!}));
        dispatch(reloadUserSlice({email: email!, tokenFirebase: tokenFirebase!}));
        setRequest(request!.filter((req) => req.nickname !== name));
    }

    const declineFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget;
        dispatch(rejectFriendSlice({id: value, token: token!}));
        dispatch(reloadUserSlice({email: email!, tokenFirebase: tokenFirebase!}));
        setRequest(request!.filter((req) => req.nickname !== name));
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                <table className="mt-1 w-full">
                    <thead className="tableHeader flex flex-row justify-around">
                        <th className="text-center">Nickname</th>
                        <th className="text-center">Actions</th>
                    </thead>
                    <tbody className="tableBody flex flex-col gap-2">
                        {request!.map((req) => (
                            <tr key={req.id} className="flex flex-row justify-around">
                                <td className="text-center">{req.nickname}</td>
                                <td className="flex flex-row gap-2 items-center justify-center">
                                    <button className="iconButton" value={req.id} name={req.nickname} onClick={acceptFriend}>
                                        <PersonAddIcon />
                                    </button>
                                    <button className="iconButton" value={req.id} name={req.nickname} onClick={declineFriend}>
                                        <PersonRemoveIcon />
                                    </button>
                                </td>
                            </tr>       
                        ))}
                    </tbody>
                </table>
                        {request!.length === 0 && (
                                <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                                    <p className="body text-white">{"You don't have any friend requests yet"}</p>
                                </div>)}

            </div>
        </div>
)}