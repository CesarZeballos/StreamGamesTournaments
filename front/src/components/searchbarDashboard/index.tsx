import { setView } from "@/redux/slices/dashboardSlice";
import { logoutSlice } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const SearchBarDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userRol = useSelector((state: RootState) => state.user.user?.role);
    const view = useSelector((state: RootState) => state.dashboard.view);

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }

    const logout = () => {
        dispatch(logoutSlice())
        setTimeout(() => {
            router.push("/")
        }, 1500);
    }
    
    return (
        <div className="bg-BGdark rounded-3xl py-4 px-12 mr-9 h-full flex flex-col items-center w-fit">
                <button className="buttonSecondary" onClick={() => handleViewClick("data")}>Data</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("notifications")}>Notifications</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("friends")}>Friends</button>
                <button className="buttonPrimary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("tournaments")}>Tournaments</button>
                {userRol === "organizer" || userRol === "admin" && <div>
                    <button className="buttonSecondary" onClick={() => handleViewClick("myTournaments")}>Organized tournaments</button>
                    <button className="buttonSecondary" onClick={() => handleViewClick("createTournament")}>Create Tournament</button>
                    </div>}
                {userRol === "admin" && <div>
                <button className="buttonSecondary" onClick={() => handleViewClick("users")}>Users</button>
                </div>}
                <button className="buttonPrimary" onClick={logout}>Sign Out</button>
        </div>
    )
}
