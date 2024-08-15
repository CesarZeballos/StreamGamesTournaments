'use client'
import { IOrganizerTournament } from "@/interfaces/interfaceTournaments";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteTournament } from "@/redux/thunks/userActionsSliceThunk";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { isoToDate } from "@/utils/formatDate";
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const DashboardViewOrganizerTournaments = () => {
    const dispatch = useDispatch<AppDispatch>()

    const organiderTournaments = useSelector((state: RootState) => state.user.user?.organizerTournaments);
    const token = useSelector((state: RootState) => state.user.token)
    const user = useSelector((state: RootState) => state.user.user)

    const [tournaments, setTournaments] = useState<IOrganizerTournament[]>([] as IOrganizerTournament[]);

    
    useEffect(() => {
        if(!user) return
        dispatch(reloadUserSlice({email: user?.email, tokenFirebase: user?.tokenFirebase}))
        if (!organiderTournaments) return
        const tournamentsActive = organiderTournaments.filter((tour: IOrganizerTournament) => tour.state === true)
        setTournaments(tournamentsActive)
    }, [])

    const handleDeleteTournament = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name, value} = event.currentTarget
        if(value && token) {
            toast(`Are you sure you want to eliminate ${name}? This action is irreversible`, {
                position: "top-right",
                action: {
                    label: "yes! i'm sure",
                    onClick: () => {
                        dispatch(deleteTournament({
                            token: token,
                            id: value
                        }))
                    }
            }
            })
        }
    }
 
    return (
        <div className="">
            <table className="mt-1">
                <thead className="tableHeader flex flex-row justify-around">
                    <th className="text-center">Tournament</th>
                    <th className="text-center">Date</th>
                    <th className="text-center">Game</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Occupation</th>
                    <th className="text-center">State</th>
                    <th className="text-center">Actions</th>
                </thead>
                        <tbody className="tableBody flex flex-col gap-2">
                            {tournaments.map((tour) => (
                                <tr className="flex flex-row justify-around items-center" key={tour.id}>
                                    <td className="text-center">{tour.nameTournament}</td>
                                    <td className="text-center">{isoToDate(tour.startDate)}</td>
                                    <td className="text-center">{tour.gameName}</td>
                                    <td className="text-center">{tour.category}</td>
                                    <td className="text-center">{tour.teams.length} / {tour.maxTeams}</td>
                                    <td className="text-center">{tour.state === true ? "Active" : "Inactive"}</td>
                                    <td className="text-center">
                                        <button className="iconButton"
                                        name={tour.nameTournament}
                                        value={tour.id}
                                        onClick={handleDeleteTournament}>
                                            <CancelIcon/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                {tournaments.length === 0 && (
                    <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                        <p className="body text-white">{"You do not have any tournament organized yet"}</p>
                    </div>)}
            </table>
        </div>
    )
}