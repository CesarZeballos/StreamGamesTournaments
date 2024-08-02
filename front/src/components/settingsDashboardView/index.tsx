import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export const SettingsDashboardView = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const stringDate = user?.birthdate.split('T')[0];

    return (
        <div className="flex flex-col gap-9">
            <div>
                <h2 className="heading5 text-lightViolet">Here you can see your data</h2>
                <div className="flex flex-col mt-4 ml-12 gap-2">
                    <p className="body text-white">Nickname: {user?.nickname}</p>
                    <p className="body text-white">Email: {user?.email}</p>
                    <p className="body text-white">Role: {user?.role}</p>
                    <p className="body text-white">Birthdate: {stringDate}</p>
                </div>
            </div>

            <div>
                <h1 className="heading5 text-lightViolet">Settings</h1>
                <div className="flex flex-col justify-center items-center w-fit gap-2">
                    <div className="flex flex-row mt-4 ml-12 gap-2">
                        <button className="buttonSecondary">Edit my data</button>
                        <button className="buttonSecondary">Change password</button>
                    </div>
                    {user?.role === "user" && <button className="buttonPrimary">Upgrade to organizer</button>}
                </div>
            </div>
        </div>
    )
}