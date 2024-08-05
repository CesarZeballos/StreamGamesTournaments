'use client'
import Image from "next/image";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendsDashboardView } from "../friendsDashboardView";
import { TournamentsDashboardView } from "../tournamentsDashboardView";
import { SearchBarDashboard } from "../searchbarDashboard";
import { AddFriend } from "../addFriendForm";
import { NotificationDashboardView } from "../notificationDashboardView";
import { getUsersSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { SettingsDashboardView } from "../settingsDashboardView";
import { setView } from "@/redux/slices/dashboardSlice";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import TournamentForm from "../tournamentForm";

export const UserDashboardView: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const section = useSelector((state: RootState) => state.dashboard.view);
    const token = useSelector((state: RootState) => state.user.token);
    
    useEffect(() => {
        if (token === null) {
            router.push("/")
        } else if(section === "") {
            dispatch(setView("notifications"))
        }
    }, [router, token, section, dispatch])
    
    return (
            <div className="grid grid-cols-4 gap-x-6 mt-4">
                <SearchBarDashboard />
                <div className="col-span-2 f-full pt-4">
                    {section === 'notifications' && <NotificationDashboardView/>}
                    {section === 'friends' && <FriendsDashboardView/>}
                    {section === 'addFriend' && <AddFriend/>}
                    {section === 'tournaments' && <TournamentsDashboardView/>}
                    {section === 'settings' && <SettingsDashboardView/>}
                    
                    {section === 'myTournaments' && <TournamentsDashboardView/>}
                    {section === 'createTournament' && <TournamentForm />}

                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    <Image className="w-full h-full object-cover" width={500} height={500} src="/dashboard.jpg" alt="dashboard" />
                </div>
            </div>
    )
}