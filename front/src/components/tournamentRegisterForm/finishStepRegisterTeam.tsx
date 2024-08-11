'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../formContainer";
import { isoToDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { setView } from "@/redux/slices/dashboardSlice";
import { IUser } from "@/interfaces/interfaceUser";
import { ITournament } from "@/interfaces/interfaceTournaments";
import { setCancelRegisterToTournament } from "@/redux/slices/paymentSlice";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";


export const FinishStepRegisterTeam = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user.user);
    
    useEffect(() => {
        dispatch(reloadUserSlice({
            email: user?.email!,
            tokenFirebase: user?.tokenFirebase
        }))
        setTimeout(() => {
            dispatch(setCancelRegisterToTournament())
            router.push("/")
        }, 4000)
    }, [dispatch, router, user])
    
    const handleFinish = () => {
        dispatch(setView("dashboard"))
        dispatch(setCancelRegisterToTournament())
        router.push("/dashboard")
    }
    return (
        <div>
            <h1 className="heading4 text-white mb-16">{`Congratulations, your team is registered in the Tournament`}</h1>
            <button className="buttonPrimary" onClick={handleFinish}>Go to my tournament</button>
        </div>
    )
}