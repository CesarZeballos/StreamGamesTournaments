'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeamsDashboardView } from "../teamsDashboardView";
import { TournamentsDashboardView } from "../tournamentsDashboardView";
import { DataDashboardView } from "../dataDashboardView";
import { setView } from "@/redux/slices/dashboardSlice";
import { SearchBarDashboard } from "../searchbarDashboard";
import { ITeam } from "@/interfaces/interfaceUser";


export const UserDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);
    const section = useSelector((state: RootState) => state.dashboard.view);

    const [teams, setTeams] = useState<ITeam[]>([])
    const [tournaments, setTournaments] = useState([])
    
    useEffect(() => {
        if (!user) {
            router.push("/")
        } else {
            // logica para cargar la seccion del dashboard
        }
    }, [router, user])
    
    
    return (
        <div>
            <h1 className="heading2 text-white mb-16">Dashboard</h1>
            <div className="grid grid-cols-4 gap-x-6">
                <SearchBarDashboard />
                <div className="col-span-2 mx-9">
                    {section === 'data' && <DataDashboardView/>}
                    {section === 'teams' && <TeamsDashboardView teams={teams}/>}
                    {section === 'tournaments' && <TournamentsDashboardView tournaments={tournaments}/>}
                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    {/* <img className="w-full h-full object-cover" src="/images/teams/1.png" alt="team" /> */}
            </div>
            </div>
        </div>
    )
}