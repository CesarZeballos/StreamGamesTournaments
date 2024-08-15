"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
// import { postTournament } from "@/utils/fetchTournaments";
import { IGame, ITournamentPost, ITournamentPostError } from "@/interfaces/interfaceTournaments";
import { FormControl, MenuItem, Select } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { validateTournament } from "@/utils/validateForms/validationTournamentPost";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { banners } from "@/utils/GamesArray";
import { setBasicData, setFirstStep, setSecondStep } from "@/redux/slices/organizerSlice";
import { getGamesActivesSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { IFirstStep, ISecondStep } from "@/interfaces/interfaceRedux";
import { FirstStep } from "./firstStep";
import { SecondStep } from "./secondStep";
import { ThirdStep } from "./thirdStep";
import { FinishStep } from "./finishStep";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';


type ImageSource = StaticImageData | string;

const imagePrev = "../../app/assets/images/banners/TournBanner.jpg"

export const DashboardTournamentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // escuchar el step
  const step = useSelector((state: RootState) => state.organizer.step);

  // seteo de la informacion basica
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const token = useSelector((state: RootState) => state.user.token);
  const tournamentPost = useSelector((state: RootState) => state.organizer.tournament);

  useEffect(() => {
    dispatch(setBasicData({organizerId: userId!, token: token!}))
  }, [dispatch, userId, token])

  // estados para el control de errores
  const [errorTournament, setErrorTournament] = useState<ITournamentPostError>({} as ITournamentPostError);

  // SECOND STEP
  const [second, setSecond] = useState<ISecondStep>({} as ISecondStep)

  const handleChangeSecondStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const error = validateTournament(tournamentPost)
    if (error.membersNumber || error.maxTeam || error.price || error.award || error.description) {
      setErrorTournament(error)
    } else {
      setErrorTournament({} as ITournamentPostError)
    }
    setSecond(
      {
        ...second,
        [name]: value
      }
    )
  }

  const handleSubmitSecondStep = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setSecondStep(second))
  }

  // RENDERIZADO DE LA IMAGEN
  const image = useSelector((state: RootState) => state.organizer.tournament.urlAvatar);
  


  return (
    <>
      <div className="grid grid-cols-4 mb-8 w-fit">
        <h1 className={step === "firstStep" ? "stepActive" : "step"}><LooksOneIcon /> First step</h1>
        <h1 className={step === "secondStep" ? "stepActive" : "step"}><LooksTwoIcon /> Second step</h1>
        <h1 className={step === "thirdStep" ? "stepActive" : "step"}><Looks3Icon /> Third step</h1>
        <h1 className={step === "finishStep" ? "stepActive" : "step"}><Looks4Icon />  Finish</h1>
      </div>

    <div className="grid grid-cols-3">
        {step === "firstStep" && <FirstStep />}
        {step === "secondStep" && <SecondStep />}
        {step === "thirdStep" && <ThirdStep />}
        {step === "finishStep" && <FinishStep />}
      
      <div className="col-span-1 w-full h-60 flex items-center border-lightViolet border-4 rounded-2xl overflow-hidden">
        <Image 
        id="imagePreview" 
        src={image} 
        alt="../../app/assets/images/banners/TournBanner.jpg" 
        className="object-cover" 
        width={600} 
        height={600}
        />
      </div>
    </div>
  </>
  );
};

export default DashboardTournamentForm;