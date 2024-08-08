'use client'
import { RootState } from "@/redux/store"
import Link from "next/link"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { ITournament, ITournamentsInscripted } from "@/interfaces/interfaceTournaments"
import { TournamentViewInUserDashboard } from "../tournamentViewInUserDashboard"
import CircleIcon from '@mui/icons-material/Circle';

export const DashboardViewTournaments = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [myTournaments, setMyTournaments] = useState<ITournamentsInscripted[]>([])
    const [tourSelecter, setTourSelecter] = useState<ITournament>()
    
    useEffect(() => {
        if (user?.tournaments) {
            user.tournaments.map((tournament) => {
                const today = new Date();
                const startDate = new Date(tournament.startDate);
                const incomingInDays = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                if (today < startDate) {
                    setMyTournaments([...myTournaments, {
                        id: tournament.id,
                        nameTournament: tournament.nameTournament,
                        startDate: tournament.startDate,
                        status: `${incomingInDays} days`
                    }])
            } 
            // else if (today > startDate) {
            //     setMyTournaments([...myTournaments, {
            //         id: tournament.id,
            //         nameTournament: tournament.nameTournament,
            //         startDate: tournament.startDate,
            //         status: "Ended"
            //     }])
            // }
            })
        }
    }, [user, myTournaments])

    const tournamentSelected = (id: string) => {
        const tour = user?.tournaments.find((tour) => tour.id === id)
        setTourSelecter(tour!)
    }
 
    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h1 className="heading5 text-lightViolet">Your tournaments</h1>
                    <table className="mt-1 w-full">
                        <thead className="tableHeader flex flex-row justify-around">
                            <th className="text-center"></th>
                            <th className="text-center">Name</th>
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
                                                tour.id === tourSelecter?.id ? <CircleIcon className="text-lightViolet" /> : null
                                                }
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => tournamentSelected(tour.id)}>
                                                    {tour.nameTournament}
                                                </button>
                                            </td>
                                            <td className="text-center">{tour.startDate}</td>
                                            <td className="text-center">{tour.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                    </table>
                </div>
                {!tourSelecter || tourSelecter === undefined ? <div className="col-span-1"></div> : <TournamentViewInUserDashboard tour={tourSelecter} />}

            </div>
        </div>
    )
}