'use client'
import { StaticImageData } from "next/image";
import { ITournament, IAddTeam, IGame } from "@/interfaces/interfaceTournaments";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FourColumsContainer } from "../fourColumsContainer";
import { FormContainer } from "../formContainer";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import { IUser } from "@/interfaces/interfaceUser";
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { setView } from "@/redux/slices/dashboardSlice";
import { fetchAddTeamToTournament } from "@/utils/fetchTournaments";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { isoToDate } from "@/utils/formatDate";
import { postTeamToTournamentSlice } from "@/redux/thunks/tournamentsSliceThunk";

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

export const TournamentRegisterForm = ({ tourId }: { tourId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // Seteo de la informacion
    const user = useSelector((state: RootState) => state.user.user);
    const [userData, setUserData] = useState<IUser>(user!);
    const tournaments = useSelector((state: RootState) => state.tournament.tournaments);
    const turnament = tournaments.find((tournament) => tournament.id === tourId);
    const [teamMembers, setTeamMembers] = useState<string[]>([]);
    const [tournamentData, setTournamentData] = useState<ITournament>(turnament!);
    const stringDate = isoToDate(tournamentData?.startDate)
    
    const [addTeam, setAddTeam] = useState<IAddTeam>({
        tournamentId: tourId,
        name: "",
        organizerId: user!.id,
        users: []
    });

    //control de ingreso a la page
    const token = useSelector((state: RootState) => state.user.token);
    useEffect(() => {
        if (token === null || user === null) {
            router.push("/login")
        }
    }, [router, token, dispatch, user])

    // selector de miembros
    const handleChangeMembers = (event: SelectChangeEvent<typeof teamMembers>) => {
        const { value } = event.target;
        const selectedNicknames = typeof value === 'string' ? value.split(',') : value;
    
        // Encuentra los objetos completos basados en los nicknames seleccionados
        const selectedMembers = user!.friends.filter(friend => selectedNicknames.includes(friend.nickname));

        const completedTeam = [...selectedMembers, userData]
        
        const membersIdArray: string[] = []
        for(let i = 0; i < completedTeam.length; i++) {
            membersIdArray.push(completedTeam[i].id)
        }
        setTeamMembers(selectedNicknames);

        setAddTeam(addTeam => ({
          ...addTeam,
          users: membersIdArray
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
        const teamLength = addTeam.users.length
        if (teamLength < tournamentData.membersNumber) {
            toast.error(`this tournaments require ${tournamentData.membersNumber} team members. Need ${tournamentData.membersNumber - teamLength} more`, {
                position: 'top-right',
                duration: 1500,
            })
        } else if (teamLength > tournamentData.membersNumber) {
            toast.error(`this tournaments require ${tournamentData.membersNumber} team members. Need ${teamLength - tournamentData.membersNumber} less`, {
                position: 'top-right',
                duration: 1500,
            })
        } else {
            try {
                dispatch(postTeamToTournamentSlice({teamData: addTeam,token: token!}))
            } catch {
                toast.error("something went wrong", {
                    position: 'top-right',
                    duration: 1500,
                })
            }
        }
    }

    const payment = useSelector((state: RootState) => state.auxiliar.statusPayment);
    useEffect(() => {
        if(payment === "succeeded") {
            dispatch(setView("tournaments"))
            dispatch(reloadUserSlice({
                email: user!.email!,
                tokenFirebase: user!.tokenFirebase
            }))
            router.push("/dashboard")
            toast.success(`Your team is registered in the ${tournamentData.nameTournament}`, {
                position: 'top-right',
                duration: 1500,
            })
        } 
    }, [payment, dispatch, router, user, tournamentData.nameTournament])

    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        router.push("/tournaments/" + tourId);
    }
    
    const addFriend = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setView("addFriends"))
        router.push("/dashboard")
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
                                name="name"
                                value={addTeam.name}
                                onChange={handleChange}
                                className="input"
                                required />
                            </div>

                            <p className="body text-white mt-4">Members</p>
                            {
                                !user?.friends || user?.friends.length === 0 ? <div className="flex flex-row items-center">
                                    <p className="body text-white">No friends yet. add them</p>
                                    <button className="buttonSecondary" onClick={addFriend}>Here</button>  
                                    </div>
                                    : 
                                    <div>

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
                                            {user!.friends.map((friend) => (
                                                <MenuItem
                                                key={friend.id}
                                                value={friend.nickname}
                                                >
                                                {friend.nickname}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        </FormControl>
                                        <p className="errorForm">{`select ${tournamentData.membersNumber - 1} friends`}</p>
                                    </div>
                            }

                        </FormContainer> 
                    }

                    <FormContainer section={""}>
                        <div className="flex flex-row gap-2">
                            <button type="submit" className="buttonPrimary">Register team</button>
                            <button className="buttonSecondary" onClick={goBack}>Cancel</button>
                        </div>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    );
}