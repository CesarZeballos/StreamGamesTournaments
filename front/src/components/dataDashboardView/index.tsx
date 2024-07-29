import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export const DataDashboardView: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const stringDate = user?.birthDate.split('T')[0];
    
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col">
                <h1 className="heading4 text-white">Hi {user?.nickName}!</h1>
                <div className="flex flex-col mt-4">
                    <h2 className="heading5 text-white">Here you can see your data</h2>
                    <p className="body text-white">Nickname: {user?.nickName}</p>
                    <p className="body text-white">Email: {user?.email}</p>
                    <p className="body text-white">Role: {user?.role}</p>
                    <p className="body text-white">Birthdate: {stringDate}</p>
                </div>

            </div>
        </div>
    )
}