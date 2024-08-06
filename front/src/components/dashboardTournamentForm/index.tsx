"use client";
import React, { useState } from "react";
import { toast } from "sonner";
// import { postTournament } from "@/utils/fetchTournaments";
import { gameImages, categoryIcons, categories, gameName } from "@/utils/tournamentsData";
import { ITournamentPost } from "@/interfaces/interfaceTournaments";
import { PostContainer } from "./PostContainer";
import { FormControl, MenuItem, Select } from "@mui/material";
import { StaticImageData } from "next/image";

type ImageSource = StaticImageData | string;


export const DashboardTournamentForm: React.FC = () => {
  const [nameTournament, setNameTournament] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const categoryOptions = Object.keys(categoryIcons);
  const [game, setGame] = useState<string>("");
  const gameOptions = Object.keys(gameImages);

  const [image, setImage] = useState<ImageSource | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setImage(file);
    }
  };

  const [membersNumber, setMembersNumber] = useState<number>(10);
  const [maxTeam, setMaxTeam] = useState<number>(2);
  const [price, setPrice] = useState<number>(500);
  const [awards, setAwards] = useState<string[]>(["", "", ""]);
  const handleAwardChange = (index: number, value: string) => {
    const newAwards = [...awards];
    newAwards[index] = value;
    setAwards(newAwards);
  };
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ITournamentPost = {
      nameTournament,
      startDate,
      category: category,
      organizerId: "placeholder-organizer-id",
      gameId: game,
      membersNumber,
      maxTeam,
      price,
      urlAvatar: image || gameImages[game],
      award: awards,
      description,
    };

    try {
      // await postTournament(data);
      toast.success("Tournament created successfully!");
    } catch (error) {
      toast.error("Error creating tournament");
    }
  };

  const minDate = new Date().toISOString().split("T")[0];
  const awardOptions = [
    [1500, 2000, 2500],
    [500, 750, 1000],  
    [100, 250, 400],   
  ];

  return (
    <PostContainer section="Create Tournament" image={image || gameImages[game]}>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-white font-Raleway text-base">Tournament Name</label>
          <input
            type="text"
            value={nameTournament}
            onChange={(e) => setNameTournament(e.target.value)}
            placeholder="Create a name for the Tournament"
            required
            className="input"
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {categories[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Game</label>
          <select
            value={game}
            onChange={(e) => setGame(e.target.value)}
            required
            className="input"
          >
            <option value="">Select a game</option>
            {gameOptions.map((option) => (
              <option key={option} value={option}>
                {gameName[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Image</label>
          <input className="mb-2 text-white" type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label className="label">Number of Members</label>
          <input
            type="number"
            value={membersNumber}
            onChange={(e) => setMembersNumber(Math.max(10, Math.min(40, Number(e.target.value))))}
            className="input"
            required
            min={10}
            max={40}
          />
          <p className="helper">You can only select from 10 to 40.</p>
        </div>

        <div>
          <label className="label">Max Teams</label>
          <input
            type="number"
            value={maxTeam}
            onChange={(e) => setMaxTeam(Math.max(2, Math.min(8, Number(e.target.value))))}
            required
            className="input"
            min={2}
            max={8}
          />
          <p className="helper">You can only select from 2 to 8.</p>
        </div>

        <div>
          <label className="label">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Math.max(500, Math.min(2500, Number(e.target.value))))}
            required
            className="input"
            min={500}
            max={2500}
          />
          <p className="helper">You can only select from 500 to 2500.</p>
        </div>

        <div>
          <label className="label">Awards</label>
          <div className="flex flex-row justify-around body text-white">
          <p>1st.</p>
          <p>2nd.</p>
          <p>3rd.</p>
          </div>
          <div className="flex flex-row items-center">
          {awards.map((award, index) => (
            <FormControl key={index} fullWidth size="small">
              <Select
                labelId={`award-label-${index}`}
                value={award}
                onChange={(e) => handleAwardChange(index, e.target.value as string)}
                required
                className="input"
              >
                {awardOptions[index].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          </div>
        </div>

        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="input"
            min={minDate}
          />
        </div>

        <div>
          <label className="label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input"
            maxLength={200}
          />
          <p className="helper">Maximum 200 characters allowed.</p>
        </div>

        <div className="flex justify-center">
        <button className="buttonPrimary mt-4" type="submit">Create Tournament</button>
        </div>
      </form>
    </PostContainer>
  );
};

export default DashboardTournamentForm;