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
import { setBasicData, setMembers, setTeamName } from "@/redux/slices/paymentSlice";

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

export const TournamentRegisterForm = ({ tourId }: { tourId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    // captura de la informacion basica del torneo y del usuario logueado
    const user = useSelector((state: RootState) => state.user.user);
    const token = useSelector((state: RootState) => state.user.token);
    
    //renderizado de los datos del torneo
    useEffect(() => {
        dispatch(getTournamentById(tourId))
    }, [tourId, dispatch])
    const tournamentData = useSelector((state: RootState) => state.payment.tournamentData);
    const stringDate = isoToDate(tournamentData?.startDate)

    // Seteo de la informacion inicial
    useEffect(() => {
        dispatch(setBasicData({
            organizerId: user!.id, 
            token: token! }))
        }, [dispatch, user, token])
        
        // seteo del nombre del equipo
        const teamName = useSelector((state: RootState) => state.payment.teamData.name);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            dispatch(setTeamName(value))
        }
        
        // selector de miembros
        const handleChangeMembers = (event: SelectChangeEvent<typeof teamMembers>) => {
            const { value } = event.target;
            const selectedNicknames = typeof value === 'string' ? value.split(',') : value;
        
            // Encuentra los objetos completos basados en los nicknames seleccionados
            const selectedMembers = user!.friends.filter(friend => selectedNicknames.includes(friend.nickname));
    
            // crea un array con todos los miembros mas el logueado
            const completedTeam = [...selectedMembers]
            
            //arma el array de ids con todos los miembros del equipo
            const membersIdArray: string[] = [user!.id]
            for(let i = 0; i < completedTeam.length; i++) {
                membersIdArray.push(completedTeam[i].friendId)
            }

            //setea la vista en el selector
            setTeamMembers(selectedNicknames);

            //setea en el store el array de ids
            dispatch(setMembers(membersIdArray))
        };

        // estados necesarios para el renderizado:
        const [teamMembers, setTeamMembers] = useState<string[]>([]);

        
        //control de ingreso a la page
        useEffect(() => {
            if (token === null || user === null) {
                router.push("/login")
            }
        }, [router, token, dispatch, user])
        
        //botones y navegacion
        const [step, setStep] = useState("team");
        const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            router.push("/tournaments/" + tournamentData.id);
        }

        const { teamData } = useSelector((state: RootState) => state.payment);
        const goToPayment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const teamName = teamData.name;
            const membersNumber = tournamentData.membersNumber;
            const teamLength = teamData.users.length;
            if (teamName === '') {
                toast.error('team name is required', {
                  position: 'top-right',
                  duration: 1500,
                })
              } else if (teamLength < membersNumber!) {
                    toast.error(`this tournaments require ${membersNumber} team members. Need ${membersNumber! - teamLength} more`, {
                        position: 'top-right',
                        duration: 1500,
                    });
                } else if (teamLength > membersNumber!) {
                    toast.error(`this tournaments require ${membersNumber} team members. Need ${teamLength - membersNumber!} less`, {
                        position: 'top-right',
                        duration: 1500,
                    });
                } else {
                    setStep("payment")
                }
        
        }

        const editTeam = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setStep("team")
        }
        
        const addFriend = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            dispatch(setView("addFriends"))
            router.push("/dashboard")
        }




        // una vez aprovado el pago se ejecuta el posteo del equipo
        const { tournamentId, name, organizerId, users } = useSelector((state: RootState) => state.payment.teamData);

        const onSuccess = (orderId: string) => {
            try {
                dispatch(postTeamToTournamentSlice({
                    tournamentId: tournamentId,
                    name: name,
                    organizerId: organizerId,
                    token: token!,
                    users: users
                }))
                dispatch(setView("tournaments"))
                dispatch(reloadUserSlice({
                    email: user!.email!,
                        tokenFirebase: user!.tokenFirebase
                    }))
                    router.push("/dashboard")
            } catch {
                toast.error("something went wrong", {
                    position: 'top-right',
                    duration: 1500,
                })
            }
            }     

    return (
        <form>
            <h1 className="heading4 text-white mb-16">Register to tournament</h1>
            <FourColumsContainer imagen="registerTournament" URLimagen="/registerTournament.jpg">
                    <FormContainer section="Tournament">
                        <h2 className="heading4 text-white">{tournamentData.nameTournament}</h2>
                        <p className="body text-white mt-4">Tournaments price ${tournamentData.price}</p>
                        <p className="body text-white">the tournament will start on {stringDate}</p>
                    </FormContainer>
            {step == "team" && 
                    <FormContainer section="Select your team">
                        <div className="flex flex-col gap-2">
                            <label className="body text-white">team name</label>
                            <input type="text"
                            name="name"
                            value={teamName}
                            onChange={handleChange}
                            className="input"
                            required />
                        </div>

                        <p className="body text-white mt-4">Members</p>
                        {!user?.friends || user?.friends.length === 0 ? <div className="flex flex-row items-center">
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
                                    key={friend.friendId}
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

                    <div className="flex flex-row gap-2">
                        <button className="buttonSecondary" onClick={goBack}>Cancel</button>
                        <button className="buttonPrimary" onClick={goToPayment}>Go to payment</button>
                    </div>
                    </FormContainer> 
            
            }

            {step == "payment" && 
                    <FormContainer section={"Payment method"}>
                        <PayPalButton
                        tournamentId={tournamentData.id}
                        onSuccess={onSuccess} 
                        />
                        <div className="flex flex-row gap-2">
                            <button className="buttonSecondary" onClick={goBack}>Cancel</button>
                            <button className="buttonPrimary" onClick={editTeam}>Edit team</button>
                        </div>
                            
                    </FormContainer>
            }
            </FourColumsContainer>
        </form>
    );
}