import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export const DataDashboardView: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const stringDate = user?.birthDate.split('T')[0];
    
    return (
        <div>
            <h2 className="heading5 text-lightViolet">Here you can see your data</h2>
            <div className="flex flex-col mt-4 ml-12 gap-2">
                <p className="body text-white">Nickname: {user?.nickName}</p>
                <p className="body text-white">Email: {user?.email}</p>
                <p className="body text-white">Role: {user?.role}</p>
                <p className="body text-white">Birthdate: {stringDate}</p>
            </div>
        </div>
    )
}