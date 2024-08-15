import { IRoleSelectorDashboard } from "@/interfaces/interfaceUser";
import { setView } from "@/redux/slices/dashboardSlice";
import { logoutSlice } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GamesIcon from '@mui/icons-material/Games';
import SettingsIcon from '@mui/icons-material/Settings';

export const SearchBarDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const userRol = useSelector((state: RootState) => state.user.user?.role);
    const user = useSelector((state: RootState) => state.user.user);
    
    const [role, setRole] = useState<IRoleSelectorDashboard[]>([{id: 1, name: "Player"}])
    const [roleActive, setRoleActive] = useState<string>("Player")

    const view = useSelector((state: RootState) => state.dashboard.view);

    useEffect(() => {
        if (userRol === "admin") {
            setRole([{id: 1, name: "Player"}, {id: 2, name: "Organizer"}, {id: 3, name: "Admin"}])
        } else if (userRol === "organizer") {
            setRole([{id: 1, name: "Player"}, {id: 2, name: "Arganizer"}])
        } 
    }, [userRol])

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }

    const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        setRoleActive(value)
        if (value === "Player") {dispatch(setView("dashboard"))}
        if (value === "Organizer") {dispatch(setView("myTournaments"))}
        if (value === "Admin") {dispatch(setView("users"))}
    }

    const logout = () => {
        dispatch(logoutSlice())
        router.push("/")
    }
    
    return (
        <div className="bg-BGdark rounded-3xl py-9 mr-9 h-full flex flex-col items-center gap-9 w-full">
            <div className="flex flex-col items-center gap-2">
                <h1 className="heading4 text-lightViolet">{user?.nickname}!</h1>
                <div className="flex flex-row items-center">
                    <p className="body text-white">Role:</p>
                    <select
                            value={roleActive}
                            onChange={handleChangeRole}
                            className="bg-BGdark text-white w-fit px-4 gap-1 flex flex-col"
                            >
                            {role.map((option) => (
                                <option className="text-white my-1" key={option.id} value={option.name}>
                                {option.name}
                                </option>
                            ))}
                            </select>
                </div>

            </div>

            { roleActive === "Player" &&
            (<div className="flex flex-col items-start gap-2">
                <button className={`buttonFilter ${view === "notifications" && "buttonFilterActive"}`} onClick={() => handleViewClick("notifications")}><NotificationsIcon/>Notifications</button>
                <button className={`buttonFilter ${view === "tournaments" && "buttonFilterActive"}`} onClick={() => handleViewClick("tournaments")}><VideogameAssetIcon/>Tournaments</button>
                <button className={`buttonFilter ${view === "friends" && "buttonFilterActive"}`} onClick={() => handleViewClick("friends")}><GroupIcon/>My friends</button>
                <button className={`buttonFilter ${view === "addFriend" && "buttonFilterActive"}`} onClick={() => handleViewClick("addFriend")}><PersonAddIcon/>Add friend</button>
            </div>)
            }

            { roleActive === "Organizer" && (userRol === "organizer" || userRol === "admin") && 
            (<div  className="flex flex-col items-start gap-2">
                <button className={`buttonFilter ${view === "myTournaments" && "buttonFilterActive"}`} onClick={() => handleViewClick("myTournaments")}><VideogameAssetIcon/>Organized tournaments</button>
                <button className={`buttonFilter ${view === "createTournament" && "buttonFilterActive"}`} onClick={() => handleViewClick("createTournament")}><GamesIcon/>Create Tournament</button>
            </div>)
            }

            { roleActive === "Admin" && (userRol === "admin") &&
            (<div className="flex flex-col items-start gap-2">
                <button className={`buttonFilter ${view === "users" && "buttonFilterActive"}`} onClick={() => handleViewClick("users")}><GroupIcon/>Users</button>
                <button className={`buttonFilter ${view === "torunamentsAdmin" && "buttonFilterActive"}`} onClick={() => handleViewClick("torunamentsAdmin")}><VideogameAssetIcon/>Tournament graphs</button>
                <button className={`buttonFilter ${view === "games" && "buttonFilterActive"}`} onClick={() => handleViewClick("games")}><GamesIcon/>Games</button>
            </div>)
            }

            <div className="flex flex-col items-start gap-2">
                <button className={`buttonFilter ${view === "settings" && "buttonFilterActive"}`} onClick={() => handleViewClick("settings")}><SettingsIcon/>Settings</button>
                <button className="buttonPrimary" onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}
