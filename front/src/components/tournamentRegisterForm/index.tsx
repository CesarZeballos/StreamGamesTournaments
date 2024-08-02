'use client'
import { StaticImageData } from "next/image";
import { ITournament, IAddTeam } from "@/interfaces/interfaceTournaments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FourColumsContainer } from "../fourColumsContainer";
import { FormContainer } from "../formContainer";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { IUser } from "@/interfaces/interfaceUser";
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const friends: IUser[] = [
    {
        id: "1",
        nickName: "cesar1",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "2",
        nickName: "cesar2",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "3",
        nickName: "cesar3",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    }, 

    {
        id: "4",
        nickName: "cesar4",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "5",
        nickName: "cesar5",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "6",
        nickName: "cesar6",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },
]
export const TournamentRegisterForm = ({ tourId }: { tourId: string }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    // Seteo de la informacion
    const user = useSelector((state: RootState) => state.user.user);
    const [userData, setUserData] = useState<IUser>(user!);
    const tournaments = useSelector((state: RootState) => state.tournaments.tournaments);
    const turnament = tournaments.find((tournament) => tournament.id === tourId);
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [tournamentData, setTournamentData] = useState<ITournament>({
        id: "",
        nameTournament: "Prueba",
        startDate: "2024-01-01",
        createdAt: "",
        price: 500,
        categories: "",
        gameId: "",
        membersNumber: 0,
        award: [],
        urlAvatar: "",
        description: "",
        maxMember: 5,
        maxTeam: 0,
        organizerId: "",
        game: {
            id: "",
            name: "",
            urlImage: "",
        }
    });
    const stringDate = tournamentData.startDate.split('T')[0];
    
    const [addTeam, setAddTeam] = useState<IAddTeam>({
        tournamentId: tourId,
        teamName: "",
        organizarId: user!.id,
        members: []
    });

    //control de ingreso a la page
    useEffect(() => {
        if (!user || user === null) {
            router.push("/login")
        } 
    }, [user, router]);

    // selector de miembros
    const handleChangeMembers = (event: SelectChangeEvent<typeof teamMembers>) => {
        const { value } = event.target;
        const selectedNicknames = typeof value === 'string' ? value.split(',') : value;
    
        // Encuentra los objetos completos basados en los nicknames seleccionados
        const selectedMembers = friends.filter(friend => selectedNicknames.includes(friend.nickName));

        const completedTeam = [...selectedMembers, userData]
    
        // Actualiza el estado de teamMembers y addTeam
        setTeamMembers(selectedNicknames);

        setAddTeam(addTeam => ({
          ...addTeam,
          members: completedTeam
        }));
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAddTeam({
            ...addTeam,
            [name]: value
        })
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const teamLength = addTeam.members.length
        if (teamLength < tournamentData.maxMember) {
            toast.error(`this tournaments require ${tournamentData.maxMember} team members. Need ${tournamentData.maxMember - teamLength} more`, {
                position: 'top-right',
                duration: 1500,
            })
        } else if (teamLength > tournamentData.maxMember) {
            toast.error(`this tournaments require ${tournamentData.maxMember} team members. Need ${teamLength - tournamentData.maxMember} less`, {
                position: 'top-right',
                duration: 1500,
            })
        } else {
            console.log("addTeam", addTeam)
            //enviar la data
        }
        }

    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        router.push("/tournaments/" + tourId);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading1 text-white mb-16">Register to tournament</h1>
            <FourColumsContainer imagen="registerTournament" URLimagen="/registerTournament.jpg">
                    <FormContainer section="Tournament">
                        <h2 className="heading4 text-white">{tournamentData.nameTournament}</h2>
                        <p className="body text-white mt-4">Tournaments price ${tournamentData.price}</p>
                        <p className="body text-white">the tournament will start on {stringDate}</p>
                    </FormContainer>

                    {tournamentData.membersNumber !== 1 &&
                        <FormContainer section="Select your team">
                            <div className="flex flex-col gap-2">
                                <label className="body text-white">team name</label>
                                <input type="text"
                                name="teamName"
                                value={addTeam.teamName}
                                onChange={handleChange}
                                className="input"
                                required />
                            </div>

                            <p className="body text-white">Members</p>
                            <FormControl sx={{ m: 1, width: 320 }}>
                                <Select
                                multiple
                                displayEmpty
                                value={teamMembers}
                                onChange={handleChangeMembers}
                                className="inputMUI"
                                input={<OutlinedInput 
                                    id="multipleMembers" 
                                    />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                    return <em className="body text-BGdark">Members</em>;
                                    } else return (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip 
                                        className="chip" 
                                        key={value} label={value} />
                                    ))}
                                    </Box>)
                                }     
                            }
                                MenuProps={MenuProps}
                                >
                                {friends.map((friend) => (
                                    <MenuItem
                                    key={friend.id}
                                    value={friend.nickName}
                                    >
                                    {friend.nickName}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <p className="errorForm">{`select ${tournamentData.maxMember - 1} friends`}</p>

                        </FormContainer> 
                    }
                    <FormContainer>
                        <div className="flex flex-row gap-2">
                            <button type="submit" className="buttonPrimary">Register team</button>
                            <button className="buttonSecondary" onClick={goBack}>Cancel</button>
                        </div>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    );
}