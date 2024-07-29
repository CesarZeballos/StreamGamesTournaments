'use client'
import { StaticImageData } from "next/image";
import { ITournament, IAddTeam } from "@/interfaces/interfaceTournaments";
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
import { fetchTournamentById } from "@/utils/fetchTournaments";
import { setView } from "@/redux/slices/dashboardSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ImageSource = StaticImageData | string;

export const TournamentRegisterForm = ({ tourId }: { tourId: string }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [tournamentData, setTournamentData] = useState<ITournament>({
        id: "",
        nameTournament: "",
        description: "",
        startDate: "",
        games: null,
        players: 0,
        membersNumber: 0,
        categories: "",
        price: 0,
        award: 0,
        urlStream: "",
        organizerId: "",
        gameId: "",
        membersNumber: 0,
        award: [""],
        urlAvatar: "",
        description: "",
        maxMember: 0,
        maxTeam: 0,
        organizerId: "",
        game: {
            id: "",
            name: "",
            urlImage: "",
        }
    });

    const stringDate = tournamentData.startDate.split('T')[0];

    const [userData, setUserData] = useState<IUser>({
        id: "",
        nickName: "",
        email: "",
        birthDate: "",
        role: "",
        teams: [],
    });

    const [team, setTeam] = useState("");

    const [registerData, setRegisterData] = useState<IAddTeam>({
        tournamentId: tourId,
        teamId: "",
        payment: "full",
    })

    useEffect(() => {
        fetchTournamentById(tourId).then((data) => {
            setTournamentData(data)
        })
    }, [ tourId ]);

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
        const tournamentRegisterData = {
            tournamentId: tourId,
            teamId: team,
            payment: registerData.payment
        }
        console.log(tournamentRegisterData)
        if(!team || !registerData.payment) {
            toast.error(`Please select a team and select a payment method`, {
                position: "top-right",
                duration: 1500,
            })
        } else {
            // dispatch(state.registerTournament(registerData))
            dispatch(setView('tournaments'))
            toast.success(`Tournament registered successfully`, {
                position: "top-right",
                duration: 1500,
            })
            setTimeout(() => {
                router.push("/dashboard")
            }, 1500)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading1 text-white mb-16">Register to tournament</h1>
            <FourColumsContainer imagen="registerTournament" URLimagen="/registerTournament.jpg">
                    <FormContainer section="Tournament">
                        <h2 className="heading5 text-white">{tournamentData.nameTournament}</h2>
                        <p className="body text-white mt-4">the tournament will start on {stringDate}</p>
                    </FormContainer>

                    {tournamentData.membersNumber !== 1 &&
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

                    {tournamentData.membersNumber !== 1 && 
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
                                    label={`"Full Payment ($${tournamentData.price})"`} 
                                />
                                <FormControlLabel 
                                    className="body text-white" 
                                    value="Individual" 
                                    control={<Radio className="body text-white"/>} 
                                    label={`Individual Payment ($${tournamentData.price / tournamentData.membersNumber})`}
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