'use client'
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { DashboardViewFriends } from "../DashboardViewFriends";
import { DashboardViewTournaments } from "../dashboardViewTournaments";
import { DashboardViewAddFriend } from "../dashboardViewAddFriend";
import { DashboardViewSettings } from "../dashboardViewSettings";
import { DashboardView } from "../dashboardView";
import DashboardTournamentForm from "../dashboardTournamentForm";
import UsersArea from "../Areas/UsersArea";
import TournamentsArea from "../Areas/TournamentsArea";
import GamesArea from "../Areas/GamesArea";
import { DashboardViewGameForm } from "../dashboardViewGameForm";
import { DashboardViewNotification } from "../dashboardViewNotifications";
import { DashboardViewOrganizerTournaments } from "../dashboardViewOrganizerTournaments";

export const DashboardSelector: React.FC = () => {
    const section = useSelector((state: RootState) => state.dashboard.view);

    return (
            <div>
                {section === 'dashboard' && <DashboardView/>}
                {section === 'notifications' && <DashboardViewNotification/>}
                {section === 'friends' &&  <DashboardViewFriends/>}
                {section === 'addFriend' && <DashboardViewAddFriend/>}
                {section === 'tournaments' && <DashboardViewTournaments/>}

                {section === 'settings' && <DashboardViewSettings/>}

                {section === 'myTournaments' && <DashboardViewOrganizerTournaments />}
                {section === 'createTournament' && <DashboardTournamentForm />}

                {section === 'users' && <UsersArea/>}
                {section === 'torunamentsAdmin' && <TournamentsArea/>}
                {section === 'createGame' && <DashboardViewGameForm />}

                {section === 'games' && <GamesArea/>}
            </div>
    )
}