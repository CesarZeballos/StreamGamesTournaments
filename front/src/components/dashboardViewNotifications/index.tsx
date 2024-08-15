import { useState } from 'react';
import { DashboardViewTournamentsNotification } from '../dashboardViewTournamentsNotification';
import { DashboardViewFriendRequests } from '../dashboardViewFriendRequests';

export const DashboardViewNotification: React.FC = () => {
    const [notifications, setNotifications] = useState("friends");

    return (
            <div>
                <div className="flex flex-row items-center gap-4 mt-4">
                    <button 
                    className={`buttonFilter ${notifications === "friends" && "buttonFilterActive"}`} 
                    onClick={() => setNotifications("friends")}
                    >
                        Friend requests
                    </button>
                    <button 
                    className={`buttonFilter ${notifications === "tournaments" && "buttonFilterActive"}`} 
                    onClick={() => setNotifications("tournaments")}
                    >
                        Tournaments notifications
                    </button>
                </div>

                {notifications === "friends" && <DashboardViewFriendRequests/>}
                {notifications === "tournaments" && <DashboardViewTournamentsNotification/>}
            </div>
    )
}