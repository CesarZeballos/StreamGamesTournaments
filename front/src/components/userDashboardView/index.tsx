'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FriendsDashboardView } from "../friendsDashboardView";
import { TournamentsDashboardView } from "../tournamentsDashboardView";
import { DataDashboardView } from "../dataDashboardView";
import { SearchBarDashboard } from "../searchbarDashboard";
import { AddFriend } from "../addFriendForm";


export const UserDashboardView: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const section = useSelector((state: RootState) => state.dashboard.view);
    
    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [router, user])
    
    return (
        <div>
            <h1 className="heading2 text-white mb-9">Dashboard</h1>
            <div className="grid grid-cols-4 gap-x-6">
                <SearchBarDashboard />
                <div className="col-span-2 f-full pt-4">
                    {section === 'data' && <DataDashboardView/>}
                    {section === 'friends' && <FriendsDashboardView/>}
                    {section === 'addFriend' && <AddFriend/>}
                    {section === 'tournaments' && <TournamentsDashboardView/>}
                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="/dashboard.jpg" alt="dashboard" />
            </div>
            </div>
        </div>
    )
}