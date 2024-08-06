import { setView } from "@/redux/slices/dashboardSlice";
import { logoutSlice } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const SearchBarDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userRol = useSelector((state: RootState) => state.user.user?.role);
    const user = useSelector((state: RootState) => state.user.user);

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }
    const handleRoot = () => {
        router.push("/postTournament")
}

    const logout = () => {
        dispatch(logoutSlice())
        router.push("/")
    }
    
    return (
        <div className="bg-BGdark rounded-3xl py-9 mr-9 h-full flex flex-col items-center gap-9 w-full">
            <h1 className="heading5 text-lightViolet">Hi {user?.nickname}!</h1>

            <div className="flex flex-col items-center gap-2">
                <button className="buttonSecondary" onClick={() => handleViewClick("notifications")}>Notifications</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("tournaments")}>Tournaments</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("friends")}>Friends</button>
                <button className="buttonPrimary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
            </div>

            {(userRol === "organizer" || userRol === "admin") && 
            <div  className="flex flex-col items-center gap-2">
                <h1 className="heading5 text-lightViolet">Organizer options</h1>
                <button className="buttonSecondary" onClick={() => handleViewClick("myTournaments")}>Organized tournaments</button>
                <button className="buttonPrimary" onClick={() => handleRoot()}>Create Tournament</button>
            </div>}

            {userRol === "admin" && 
            <div className="flex flex-col items-center gap-2">
                <h1 className="heading5 text-lightViolet">Admin options</h1>
                <button className="buttonSecondary" onClick={() => handleViewClick("users")}>Users</button>
                <button className="buttonSecondary" onClick={() => handleViewClick("torunamentsAdmin")}>Tournament graphs</button>
            </div>}

            <div className="flex flex-col items-center gap-2">
                <button className="buttonSecondary" onClick={() => handleViewClick("settings")}>Settings</button>
                <button className="buttonPrimary" onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}
