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

export const TournamentRegisterForm = ({ tourId }: { tourId: string }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    // Seteo de la informacion
    const user = useSelector((state: RootState) => state.user.user);
    const tournaments = useSelector((state: RootState) => state.tournaments.tournaments);
    const turnament = tournaments.find((tournament) => tournament.id === tourId);
    const [tournamentData, setTournamentData] = useState<ITournament>(turnament!);
    const stringDate = tournamentData.startDate.split('T')[0];
    
    //control de ingreso a la page
    useEffect(() => {
        if (!user) {
            router.push("/login")
        } 
    }, [user, router]);

    const [addTeam, setAddTeam] = useState<IAddTeam>({
        tournamentId: tourId,
        teamName: "",
        members: [],
    });
   
    const [teamMembers, setTeamMembers] = useState([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setAddTeam({
            ...addTeam,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (teamMembers.length < tournamentData.maxMember) {
            toast.error(`this tournaments require ${tournamentData.maxMember} team members. Need ${tournamentData.maxMember - teamMembers.length}`, {
                position: 'top-right',
                duration: 1500,
            })
        }
        setAddTeam({
            ...addTeam, 
            members: teamMembers}
        )
        console.log(addTeam)
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
                            <p className="body text-white">Select your team members</p>
                            <h2 className="input">form selector</h2>
                            <p className="errorForm">{`select ${tournamentData.maxMember - 1} friends`}</p>

                        </FormContainer> 
                    }
                    <FormContainer>
                        <button type="submit" className="buttonPrimary">Register for the tournament</button>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    );
}


//ejemploo para el form selector:
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelectChip() {
//   const theme = useTheme();
//   const [personName, setPersonName] = React.useState<string[]>([]);

//   const handleChange = (event: SelectChangeEvent<typeof personName>) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   return (
//     <div>
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
//         <Select
//           labelId="demo-multiple-chip-label"
//           id="demo-multiple-chip"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//           renderValue={(selected) => (
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//               {selected.map((value) => (
//                 <Chip key={value} label={value} />
//               ))}
//             </Box>
//           )}
//           MenuProps={MenuProps}
//         >
//           {names.map((name) => (
//             <MenuItem
//               key={name}
//               value={name}
//               style={getStyles(name, personName, theme)}
//             >
//               {name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }