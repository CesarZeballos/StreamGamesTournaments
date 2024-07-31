import { setView } from "@/redux/slices/dashboardSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const SearchBarDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const userRol = useSelector((state: RootState) => state.user.user?.role);
    const view = useSelector((state: RootState) => state.dashboard.view);

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }
    
    return (
        <div className="bg-BGdark rounded-3xl p-4 mr-9 h-full">
            <button className="buttonSecondary" onClick={() => handleViewClick("data")}>Data</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("notifications")}>Notifications</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("friends")}>Friends</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("tournaments")}>My tournaments</button>
            {userRol === "organizer" || userRol === "admin" && <div>
                <button className="buttonSecondary" onClick={() => handleViewClick("myTournaments")}>Organized tournaments</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("createTournament")}>Create Tournament</button>
                </div>}
            {userRol === "admin" && <div>
            <button className="buttonSecondary" onClick={() => handleViewClick("users")}>Users</button>
            </div>}
        </div>
    )
}
