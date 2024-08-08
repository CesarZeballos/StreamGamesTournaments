import { AppDispatch, RootState } from "@/redux/store";
import { aceptFriendSlice, rejectFriendSlice } from "@/redux/thunks/userActionsSliceThunk";
import { useDispatch, useSelector } from "react-redux";

//icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export const DashboardViewFriendRequests: React.FC = () => {
    const friendRequests = useSelector((state: RootState) => state.user.user?.revicedFriendRequests);
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch<AppDispatch>();

    const acceptFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.value;
        dispatch(aceptFriendSlice({id: id, token: token!}));
    }

    const declineFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.value;
        dispatch(rejectFriendSlice({id: id, token: token!}));
    }

    return (
        <div className="grid grid-cols-3">
                <table className="mt-1 w-full col-span-2">
                    <thead className="tableHeader flex flex-row justify-around">
                        <th className="text-center">Nickname</th>
                        <th className="text-center">Actions</th>
                    </thead>
                    <tbody className="tableBody flex flex-col gap-2">
                        {friendRequests!.map((req) => (
                            <tr key={req.id} className="flex flex-row justify-around">
                                <td className="text-center">{req.nickname}</td>
                                <td className="flex flex-row gap-2">
                                    <button className="iconButton" value={req.id} onClick={acceptFriend}>
                                        <PersonAddIcon />
                                    </button>
                                    <button className="iconButton" value={req.id} onClick={declineFriend}>
                                        <PersonRemoveIcon />
                                    </button>
                                </td>
                            </tr>       
                        ))}
                    </tbody>
                </table>
            </div>
)}