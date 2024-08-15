import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export const DashboardView: React.FC = () => {
    const nickname = useSelector((state: RootState) => state.user.user?.nickname)
    const friendsRequests = useSelector((state: RootState) => state.user.user?.receivedFriendRequests);

    const tour = useSelector((state: RootState) => state.user.user?.notifications);
    const notificationsTour = tour?.filter(notifications => notifications.state === true)
    const tournaments = tour?.filter(notifications => notifications.tournamentDate > new Date().toISOString())

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                <h1 className="heading3 text-lightViolet mb-8">{`Hi ${nickname}!`}</h1>

                <div className="grid grid-rors-3 gap-4 w-80">   
                    <div className="flex flex-col gap-2 p-4 bg-BGdark rounded-2xl">
                        {tournaments?.length === 0 ? 
                        <p className="heading5 text-lightViolet">{`You dont't have tournaments`}</p> : 
                        <h1 className="heading5 text-lightViolet">{tournaments?.length} tournaments</h1>
                        }
                        <p className="body text-white text-end">upcoming</p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 bg-BGdark rounded-2xl">
                        {notificationsTour?.length === 0 ? 
                        <p className="heading5 text-lightViolet">{`You dont't have new tournaments`}</p> : 
                        <h1 className="heading5 text-lightViolet">{notificationsTour?.length} new tournaments</h1>
                        }
                        <p className="body text-white text-end">notifications</p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 bg-BGdark rounded-2xl">
                        {friendsRequests?.length === 0 ? 
                        <p className="heading5 text-lightViolet">{`You dont't have friends requests`}</p> : 
                        <h1 className="heading5 text-lightViolet">{friendsRequests?.length} requests</h1>
                        }
                        <p className="body text-white text-end">new friends</p>
                    </div>
                </div>

            </div>
            <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                <Image src={"/login.jpg"} alt="banner" width={500} height={500} className="w-full h-full object-cover" />
            </div>


        </div>
    )
}