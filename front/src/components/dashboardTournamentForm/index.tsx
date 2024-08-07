"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
// import { postTournament } from "@/utils/fetchTournaments";
import { IGame, ITournamentPost, ITournamentPostError } from "@/interfaces/interfaceTournaments";
import { PostContainer } from "./PostContainer";
import { FormControl, MenuItem, Select } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { validateTournament } from "@/utils/validateForms/validationTournamentPost";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { banners } from "@/utils/GamesArray";

type ImageSource = StaticImageData | string;

const categories = ["beginner", "advanced", "expert"]

const imagePrev = "../../app/assets/images/banners/TournBanner.jpg"

export const DashboardTournamentForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData ] = useState<ITournamentPost>({} as ITournamentPost);
  const [errorTournament, setErrorTournament] = useState<ITournamentPostError>({} as ITournamentPostError);

  const userId = useSelector((state: RootState) => state.user.user?.id);
  const token = useSelector((state: RootState) => state.user.token);



  // const games = useSelector((state: RootState) => state.auxiliar.games);
  // useEffect (() => {
  //   dispatch(getGamesSlice())
  // })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const error = validateTournament(data)
    if (error.nameTournament || error.startDate || error.category || error.membersNumber || error.maxTeam || error.price || error.description) {
      setErrorTournament(error)
    } else {
      setErrorTournament({} as ITournamentPostError)
    }
    setData({
      ...data,
      [name]: value
    })
  }

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setData({
      ...data,
      category: event.target.value as string
    }
    )
  };

  const handleChangeGame = (event: React.ChangeEvent<{ value: unknown }>) => {
    setData({
      ...data,
      gameId: event.target.value as string
    })
    const game = banners.find((game) => game.id === event.target.value)
    if (!imagePrevView) {
      setImagePrevView(game?.urlImage as string)
    }
  };

  const [imagePrevView, setImagePrevView] = useState<ImageSource | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePrevView(reader.result as string);
      };
      reader.readAsDataURL(file);

      setData({
        ...data,
        urlAvatar: file
      }
      )
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //chequea que si no se subio imagen se envie la imagen del torneo del juego que selecciono. 
    if(!data.urlAvatar){
      const game = banners.find((game) => game.id === data.gameId)
      setData({
        ...data,
        urlAvatar: game?.urlImage as string
      })
    }
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="grid grid-cols-2">
        <div>
          <h1 className="heading5 text-lightViolet mb-2">Create tournament</h1>

        <div className="flex flex-col gap-2 w-fit">
          <label className="body text-white">Tournament name</label>
          <input
            type="text"
            name="nameTournament"
            value={data.nameTournament}
            onChange={handleChange}
            required
            className="input"
          />
          {errorTournament.nameTournament ? (<p className="errorForm">{errorTournament.nameTournament}</p>) : (<p className="errorForm"><br/></p>)}
        </div>

        <div className="flex flex-row gap-6 w-fit">
          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Category</label>
            <select
              value={data.category}
              onChange={handleChangeCategory}
              required
              className="inputFit"
            >
              <option value="">Select a category</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <br />
          </div>

          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Game</label>
            <select
              value={data.gameId}
              onChange={handleChangeGame}
              required
              className="inputFit"
            >
              <option value="">Select a game</option>
              {banners.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <br/>
          </div>
        </div>


        <div className="flex flex-col gap-2 w-fit">
          <label className="body text-white">Image</label>
          <input id="image" className="input" type="file" accept="image/*" onChange={handleFileChange} />
          <br/>
        </div>

        <div className="flex flex-row gap-6 w-fit">
          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Number of members</label>
            <input
              type="number"
              value={data.membersNumber}
              onChange={handleChange}
              className="inputFit"
              required
            />
            {errorTournament.membersNumber ? (<p className="errorForm">{errorTournament.membersNumber}</p>) : (<p className="errorForm"><br/></p>)}
          </div>

          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Maximum teams</label>
            <input
              type="number"
              value={data.maxTeam}
              onChange={handleChange}
              required
              className="inputFit"
              min={2}
            />
            {errorTournament.maxTeam ? (<p className="errorForm">{errorTournament.maxTeam}</p>) : (<p className="errorForm"><br/></p>)}
          </div>
        </div>

        <div className="flex flex-row gap-6 w-fit">
          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Price</label>
            <input
              type="number"
              value={data.price}
              onChange={handleChange}
              className="inputFit"
            />
            {errorTournament.price ? (<p className="errorForm">{errorTournament.price}</p>) : (<p className="errorForm"><br/></p>)}
          </div>

          <div className="flex flex-col gap-2 w-fit">
            <label className="body text-white">Start date</label>
            <input
              type="date"
              value={data.startDate}
              onChange={handleChange}
              required
              className="inputFit"
              min={new Date().toISOString().split("T")[0]}
            />
            {errorTournament.startDate ? (<p className="errorForm">{errorTournament.startDate}</p>) : (<p className="errorForm"><br/></p>)}
          </div>
        </div>


        <div className="flex flex-col gap-2 w-fit">
          <label className="body text-white">Awards</label>
          
        </div>


        <div className="flex flex-col gap-2 w-fit">
          <label className="body text-white">Description</label>
          <input
            type="text"
            value={data.description}
            onChange={handleChange}
            required
            className="input"
            maxLength={500}
          />
          {errorTournament.description ? (<p className="errorForm">{errorTournament.description}</p>) : (<p className="errorForm"><br/></p>)}
        </div>

        <div className="flex flex-col gap-2 w-fit">
        <button className="buttonPrimary" type="submit">Create Tournament</button>
        </div>
        </div>
          <div className="col-span-1 w-full h-64 flex items-center border-lightViolet border-4 rounded-2xl overflow-hidden">
            <Image 
              id="imagePreview" 
              src={imagePrevView ? imagePrevView : "https://res.cloudinary.com/dofwlsemg/image/upload/v1723001828/niyic87vymj5vqitz7my.jpg"} 
              alt="../../app/assets/images/banners/TournBanner.jpg" 
              className="w-full max-h-500px object-cover" 
              width={500} 
              height={500}
            />
        </div>
    </div>
      </form>

  );
};

export default DashboardTournamentForm;