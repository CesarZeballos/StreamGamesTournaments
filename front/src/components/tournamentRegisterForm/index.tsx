'use client'
import { StaticImageData } from "next/image";
import { ITournament, ITournamentRegister } from "@/interfaces/interfaceTournaments";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FourColumsContainer } from "../fourColumsContainer";
import { FormContainer } from "../formContainer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { IUser } from "@/interfaces/interfaceUser";
import Link from "next/link";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";

type ImageSource = StaticImageData | string;

const name: { [key: string]: string } = {
    "csgo-id": "Counter Strike",
    "fortnite-id": "Fortnite",
    "lol-id": "League of Legends",
};

const descriptions: { [key: string]: string } = {
    "csgo-id": "Watch a Counter Strike: Global Offensive tournament live! Enjoy the gunfights, strategies, and passion for team play of the players who show up to provide us with this entertainment.",
    "fortnite-id": "Watch a Fortnite tournament live! What weapons will each team get? Who will win? Who will be quick with their fingers? We invite you to watch the epic battles of Fortnite, and don't forget the dance!",
    "lol-id": "Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
};

const games: { [key: string]: ImageSource } = {
    "csgo-urlStream": csgo,
    "fortnite-urlStream": fortnite,
    "lol-urlStream": lol,
};

export const TournamentRegisterForm = ({ tourId }: { tourId: string }) => {
    const dispatch = useDispatch();

    const [tournamentData, setTournamentData] = useState<ITournament>({
        id: "",
        name: "",
        description: "",
        startDate: "",
        games: null,
        players: 0,
        categories: "",
        award: 0,
        urlStream: "",
        organizerId: "",
        gameId: "",
    });

    const [userData, setUserData] = useState<IUser>({
        id: "",
        nickname: "",
        email: "",
        birthdate: "",
        role: "",
        teams: [],
    });

    const [team, setTeam] = useState("");

    const [registerData, setRegisterData] = useState<ITournamentRegister>({
        tournamentId: tourId,
        teamId: "",
        payment: "full",
    })

    useEffect(() => {
        // const tournamentData = dispatch(state.getTournament(tourId))
        // setTournamentData(tournamentData)
        // const userData = dispatch(state.getUser())
        // setUserData(userData)
    }, [])

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setTeam(event.target.value)
        console.log(team)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // dispatch(state.registerTournament(registerData))
        console.log(registerData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading1 text-white mt-9 mb-16">Register to tournament</h1>
            <FourColumsContainer imagen="registerTournament" URLimagen="/registerTournament.jpg">
                    <FormContainer section="Tournament">
                        <h2 className="heading5 text-white">{tournamentData.name}</h2>
                        <h3 className="body text-white">{tournamentData.startDate}</h3>
                    </FormContainer>

                    {tournamentData.players !== 1 &&
                        <FormContainer section="Select your team">
                            <p className="body text-white">Select your team</p>
                            <div className="flex flex-row gap-4 items-center">
                                <FormControl sx={{ m: 0, minWidth: 120 }} size="small" >
                                    <Select
                                    
                                    value={team}
                                    onChange={handleChangeSelect}
                                    displayEmpty
                                    className="input w-fit"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {userData.teams.map((team) => (
                                            <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Link href="/teams" className="buttonPrimary">Add new team</Link>
                            </div>
                        </FormContainer> 
                    }

                    {tournamentData.players !== 1 && 
                        <FormContainer section="Payments">
                            <p className="body text-white">Select your payment method</p>
                            <RadioGroup
                                // aria-labelledby="demo-radio-buttons-group-label"
                                name="payment"
                                value={registerData.payment}
                                onChange={handleChange}
                                defaultValue="full"
                            >
                                <FormControlLabel 
                                    className="body text-white" 
                                    value="full" 
                                    control={<Radio className="body text-white"/>} 
                                    label="Full Payment" 
                                />
                                <FormControlLabel 
                                    className="body text-white" 
                                    value="Individual" 
                                    control={<Radio className="body text-white"/>} 
                                    label="Individual Payment" 
                                />
                            </RadioGroup>
                        </FormContainer>
                    }
                    <FormContainer>
                        <button type="submit" className="buttonPrimary">Register</button>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    );
}