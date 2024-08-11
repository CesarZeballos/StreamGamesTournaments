'use client'
import { ITeamDataToTournamentRegister } from "@/interfaces/interfaceRedux"
import { Box, Chip, FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import { FormContainer } from "../formContainer"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { setView } from "@/redux/slices/dashboardSlice"
import { toast } from "sonner"
import { setCancelRegisterToTournament, setTeamData } from "@/redux/slices/paymentSlice"

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

export const FirstStepRegisterTeam = ({membersRequired, tournamentId}: {membersRequired: number, tournamentId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const friends = useSelector((state: RootState) => state.user.user?.friends);
    const [data, setData] = useState<ITeamDataToTournamentRegister>({} as ITeamDataToTournamentRegister)

    // logica para si quiere modificar datos cuando este en payments y vuelva al step team.
    const teamData = useSelector((state: RootState) => state.payment.teamData);

    useEffect(() => {
        if (teamData) {
            setData(teamData)
            let members: string[] = []
            for (let i = 0; i < teamData.users.length; i++) {
                members.push(friends?.find(friend => friend.id === teamData.users[i])?.nickname!)
                console.log("members", members)
            }
            setTeamMembers(members)
            console.log("teamMembers", teamMembers)
        }
    }, [teamData, friends])


    // estados necesarios para el renderizado:
    const [teamMembers, setTeamMembers] = useState<string[]>([]);

    // handler del nombre del equipo
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setData({
            ...data,
            name: value
        })
    }

    // selector de miembros
    const handleChangeMembers = (event: SelectChangeEvent<typeof teamMembers>) => {
        const { value } = event.target;
        const selectedNicknames = typeof value === 'string' ? value.split(',') : value;
    
        // Encuentra los objetos completos basados en los nicknames seleccionados
        const friendsToSelect = friends?.filter(friend => selectedNicknames.includes(friend.nickname));

        // crea un array con todos los miembros mas el logueado
        if (friendsToSelect) {
            const completedTeam = [...friendsToSelect]

            //arma el array de ids con todos los miembros del equipo
            const membersIdArray: string[] = []
            for(let i = 0; i < completedTeam.length; i++) {
                membersIdArray.push(completedTeam[i].friendId)
            }

            //setea la vista en el selector
            setTeamMembers(selectedNicknames);
    
            //setea en el store el array de ids
            setData({
                ...data,
                users: membersIdArray})
        }
    };

    // botones
    const addFriend = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setView("addFriends"))
        router.push("/dashboard")
    }

    const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setCancelRegisterToTournament())
        router.push("/tournaments/" + tournamentId);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (data.name === '') {
            toast.error('team name is required', {
                position: 'top-right',
                duration: 1500,
            })
        } else if (data.users !== undefined) {
            const teamLength = data.users.length + 1;
            if (teamLength < membersRequired) {
                toast.error(`this tournaments require ${membersRequired} team members. Need ${membersRequired - teamLength} more`, {
                    position: 'top-right',
                    duration: 1500,
                });
            } else if (teamLength > membersRequired!) {
                toast.error(`this tournaments require ${membersRequired} team members. Need ${teamLength - membersRequired} less`, {
                    position: 'top-right',
                    duration: 1500,
                });
            } else {
                dispatch(setTeamData(data))
            }
        } else {
            toast.error('team members are required', {
                position: 'top-right',
                duration: 1500,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormContainer section="Select your team">
                <div className="flex flex-col gap-2">
                    <label className="body text-white">team name</label>
                    <input type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="input"
                    required />
                </div>

                <p className="body text-white mt-4">Members</p>

                    {!friends || friends.length === 0 ? <div className="flex flex-row items-center">
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
                            {friends.map((friend) => (
                                <MenuItem
                                key={friend.friendId}
                                value={friend.nickname}
                                >
                                {friend.nickname}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <p className="errorForm">{`select ${membersRequired - 1} friends`}</p>
                        </div>
                    }
                    <div className="flex flex-row gap-2">
                        <button className="buttonSecondary" onClick={cancel}>Cancel</button>
                        <button className="buttonPrimary" type="submit">Go to payment</button>
                    </div>
            </FormContainer>
        </form>
    )
}