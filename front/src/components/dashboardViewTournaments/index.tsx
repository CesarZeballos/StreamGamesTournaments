'use client'
import { RootState } from "@/redux/store"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { ITournament, ITournamentsInscripted } from "@/interfaces/interfaceTournaments"
import CircleIcon from '@mui/icons-material/Circle';
import { isoToDate } from "@/utils/formatDate";
import { TournamentViewInUserDashboard } from "../tournamentViewInUserDashboard";

export const DashboardViewTournaments = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [myTournaments, setMyTournaments] = useState<ITournamentsInscripted[]>([])
    const [tourSelecter, setTourSelecter] = useState<string>("")
    const tournaments = useSelector((state: RootState) => state.user.user?.notifications)
    
    useEffect(() => {
        let tourAux = []
        for (let i = 0; i < tournaments?.length!; i++) {   
            const today = new Date();
            const startDate = new Date(tournaments![i].tournamentDate);
            const incomingInDays = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const { tournamentId, nameTournament, nameTeam, tournamentDate } = tournaments![i]

            if (today < startDate) {
                tourAux.push( {
                    id: tournamentId,
                    nameTournament: nameTournament,
                    teamName: nameTeam,
                    tournamentDate: tournamentDate,
                    status: `${incomingInDays} days`
                })
            } 
            else if (today > startDate) {
                tourAux.push( {
                    id: tournamentId,
                    nameTournament: nameTournament,
                    teamName: nameTeam,
                    tournamentDate: tournamentDate,
                    status: "Ended"
                })
            }
        }
        setMyTournaments(tourAux)
        }, [tournaments])

    const tournamentSelected = (id: string) => {
        if(tourSelecter === id) {
            setTourSelecter("")
        } else {
            setTourSelecter(id)
        }
    }
 
    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h1 className="heading5 text-lightViolet">Your tournaments</h1>
                    <table className="mt-1 w-full">
                        <thead className="tableHeader flex flex-row justify-around">
                            <th className="text-center"></th>
                            <th className="text-center">Tournament</th>
                            <th className="text-center">Team</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Incoming in</th>
                        </thead>
                        {myTournaments.length === 0 ? (
                            <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                                <p className="body text-white">{"You don't have any tournament yet"}</p>
                                <Link className="buttonPrimary" href="/tournaments">here</Link>
                            </div>) : (
                                <tbody className="tableBody flex flex-col gap-2">
                                    {myTournaments.map((tour) => (
                                        <tr className="flex flex-row justify-around" key={tour.id}>
                                            <td className="text-center">{
                                                tour.id === tourSelecter ? <CircleIcon className="text-lightViolet" /> : null
                                                }
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => tournamentSelected(tour.id)}>
                                                    {tour.nameTournament}
                                                </button>
                                            </td>
                                            <td className="text-center">{tour.teamName}</td>
                                            <td className="text-center">{isoToDate(tour.tournamentDate)}</td>
                                            <td className="text-center">{tour.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                    </table>
                </div>
                {tourSelecter === "" ? <div className="col-span-1"></div> : <TournamentViewInUserDashboard id={tourSelecter} />}

            </div>
        </div>
    )
}