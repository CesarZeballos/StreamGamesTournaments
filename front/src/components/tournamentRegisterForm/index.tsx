'use client'
import { ITournament, IAddTeam, IGame } from "@/interfaces/interfaceTournaments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FourColumsContainer } from "../fourColumsContainer";
import { FormContainer } from "../formContainer";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { setView } from "@/redux/slices/dashboardSlice";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { isoToDate } from "@/utils/formatDate";
import { getTournamentById, postTeamToTournamentSlice } from "@/redux/thunks/tournamentsSliceThunk";
import PayPalButton from "../paypalButton";
import { setBasicData, setStepPayment } from "@/redux/slices/paymentSlice";
import { FirstStepRegisterTeam } from "./firstStepRegisterTeam";
import { SecondStepRegisterTeam } from "./secondStepRefisterTeam";
import { FinishStepRegisterTeam } from "./finishStepRegisterTeam";



export const TournamentRegisterForm = ({ tourId }: { tourId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // captura de la informacion basica del torneo y del usuario logueado
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);

    //control de ingreso a la page
    useEffect(() => {
        if (token === null || user === null) {
            router.push("/login")
        }
    }, [router, token, dispatch, user])
    
    //renderizado de los datos del torneo
    useEffect(() => {
        dispatch(getTournamentById(tourId))
    }, [tourId, dispatch])
    const tournamentData = useSelector((state: RootState) => state.payment.tournamentData);
    const stringDate = isoToDate(tournamentData?.startDate)

    // Seteo de la informacion inicial
    useEffect(() => {
        if (user && token) {
            dispatch(setBasicData({
                organizerId: user.id, 
                token: token }))
        }
    }, [dispatch, user, token])

    
    //botones y navegacion
    const step = useSelector((state: RootState) => state.payment.step);

    return (
        <div>
            <h1 className="heading4 text-white mb-4">Register to {tournamentData.nameTournament}</h1>
            <div className="grid grid-cols-3 mb-6 mx-16">
                <h1 className={step === "team" ? "text-lightViolet" : "text-white"}>First step</h1>
                <h1 className={step === "payment" ? "text-lightViolet" : "text-white"}>Second step</h1>
                <h1 className={step === "finish" ? "text-lightViolet" : "text-white"}>Finish</h1>
            </div>
            <FourColumsContainer imagen="registerTournament" URLimagen="/registerTournament.jpg">

            {step == "team" && <FirstStepRegisterTeam membersRequired={tournamentData.membersNumber} tournamentId={tournamentData.id}/>}
            {step == "payment" && <SecondStepRegisterTeam tourId={tournamentData.id}/>}
            {step == "finish" && <FinishStepRegisterTeam/>}

            </FourColumsContainer>
        </div>
    );
}