"use client"
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { upgradeRequestUserSlice } from "@/redux/thunks/userSliceThunk";
import { useDispatch, useSelector } from "react-redux";
import { ChangesForm } from "../ChangesForm";
import { isoToDateComplete } from "@/utils/formatDate";

export const DashboardViewSettings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    useEffect(() => {
        console.log("Updated user state:", user);
    }, [user]);
    
    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    };
    if (!user?.birthdate){
        return <p className="loading">Birthdate is not set</p>;
    }
    const stringDate = isoToDateComplete(user?.birthdate);

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
            <button className="buttonSecondary" onClick={toggleFormVisibility}>
                {isFormVisible ? "Hide my data" : "Edit my data"}
            </button>
            

            {isFormVisible && <ChangesForm />}
        </div>
            {/* {user?.role === "user" && (
                <button className="buttonPrimary mt-4" onClick={upgradeAcount}>
                    Upgrade to organizer
                </button>
            )} */}
            </div>
        </div>
    )
}