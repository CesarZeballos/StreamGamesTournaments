import { useState } from 'react';
import { DashboardViewTournamentsNotification } from '../dashboardViewTournamentsNotification';
import { DashboardViewFriendRequests } from '../dashboardViewFriendRequests';

export const DashboardViewNotification: React.FC = () => {
    const [notifications, setNotifications] = useState("");

    return (
        <div className='grid grid-cols-3'>
            <div className='col-span-2'>
                <h1 className="heading5 text-lightViolet">Your notifications</h1>
                <div className="flex flex-row w-full items-center justify-around mt-4">
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
        </div>
    )
}