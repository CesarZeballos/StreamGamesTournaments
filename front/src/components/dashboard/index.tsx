'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeamsDashboardView } from "../teamsDashboardView";
import { TournamentsDashboardView } from "../tournamentsDashboardView";
import { DataDashboardView } from "../dataDashboardView";
import { setView } from "@/redux/slices/dashboardSlice";
import { SearchBarDashboard } from "../searchbarDashboard";
import { ITeam } from "@/interfaces/interfaceUser";
import { fetchUserById } from "@/utils/fetchUser";
import { reloadUSerDataSlice } from "@/redux/thunks/userSliceThunk";


export const UserDashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const section = useSelector((state: RootState) => state.dashboard.view);
    
    useEffect(() => {
        if (!user) {
            router.push("/")
        } else {
            const id = user.user?.id
            // dispatch(reloadUSerDataSlice(id))
            // setTeams([])
            
            // fetchUserById(user.id).then((data) => {
            //     setTeams(data.teams)
            //     setTournaments(data.tournaments)
            // })
        }
    }, [router, user, dispatch])

    
    
    return (
        <div>
            <h1 className="heading2 text-white mb-16">Dashboard</h1>
            <div className="grid grid-cols-4 gap-x-6">
                <SearchBarDashboard />
                <div className="col-span-2 mx-9">
                    {section === 'data' && <DataDashboardView/>}
                    {section === 'teams' && <TeamsDashboardView teams={user.user?.teams}/>}
                    {section === 'tournaments' && <TournamentsDashboardView tournaments={[]}/>}
                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="/dashboard.jpg" alt="dashboard" />
            </div>
            </div>
        </div>
    )
}