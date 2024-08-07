'use client'
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DashboardViewFriends } from "../DashboardViewFriends";
import { DashboardViewTournaments } from "../dashboardViewTournaments";
import { DashboardViewAddFriend } from "../dashboardViewAddFriend";
import { DashboardViewNotification } from "../dashboardViewNotification";
import { DashboardViewSettings } from "../dashboardViewSettings";
import DashboardTournamentForm from "../dashboardTournamentForm";
import UsersArea from "../Areas/UsersArea";
import TournamentsArea from "../Areas/TournamentsArea";
import { DashboardView } from "../dashboardView";

export const DashboardSelector: React.FC = () => {
    const section = useSelector((state: RootState) => state.dashboard.view);

    return (
            <div>
                {section === 'dashboard' && <DashboardView/>}
                {section === 'notifications' && <DashboardViewNotification/>}
                {section === 'friends' && <DashboardViewFriends/>}
                {section === 'addFriend' && <DashboardViewAddFriend/>}
                {section === 'tournaments' && <DashboardViewTournaments/>}


                {section === 'settings' && <DashboardViewSettings/>}

                
                {/* {section === 'myTournaments' && <DashboardViewTournaments/>} */}
                {section === 'createTournament' && <DashboardTournamentForm />}

                {section === 'users' && <UsersArea/>}
                {section === 'torunamentsAdmin' && <TournamentsArea/>}
            </div>
    )
}