import { AppDispatch, RootState } from "@/redux/store";
import { upgradeRequestUserSlice } from "@/redux/thunks/userSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


export const DashboardViewSettings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);

    const stringDate = user?.birthdate.split('T')[0];

    const upgradeAcount = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(upgradeRequestUserSlice({id: user?.id!, token: token!}))
    }

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
                <div className="flex flex-col mt-4 ml-4 gap-2">
                        <button className="buttonSecondary">Edit my data</button>
                        {/* <button className="buttonSecondary">Change email</button> */}
                        {/* <button className="buttonSecondary">Change password</button> */}
                    {user?.role === "user" && <button className="buttonPrimary" onClick={upgradeAcount}>Upgrade to organizer</button>}
                </div>
            </div>
        </div>
    )
}