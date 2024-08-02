'use client'
import { ITournamentsregistered } from "@/interfaces/interfaceUser"
import { RootState } from "@/redux/store"
import Link from "next/link"
import { useSelector } from "react-redux"
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
import { IMyTournaments } from "@/interfaces/interfaceTournaments"


export const TournamentsDashboardView = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const [myTournaments, setMyTournaments] = useState<IMyTournaments[]>([])
    
    useEffect(() => {
        if (user?.tournaments) {
            user.tournaments.map((tournament) => {
                const today = new Date();
                const startDate = new Date(tournament.startDate);
                if (today < startDate) {
                    setMyTournaments([...myTournaments, {
                        id: tournament.id,
                        nameTournament: tournament.nameTournament,
                        startDate: tournament.startDate,
                        status: "Upcoming"
                    }])
            } else if (today > startDate) {
                setMyTournaments([...myTournaments, {
                    id: tournament.id,
                    nameTournament: tournament.nameTournament,
                    startDate: tournament.startDate,
                    status: "Ended"
                }])
            }
            })
        }
    }, [user, myTournaments])

    const UnsubscribeTournament = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
    }


    //creado para que no llore!!
    const tournaments: ITournamentsregistered[] = []
    //
 
    return (
            <div>
                <h1 className="heading5 text-lightViolet">Your tournaments</h1>
                <table className="mt-1 w-full">
                    <thead className="tableHeader flex flex-row justify-around">
                        <th className="text-center">Name</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Unsubscribe</th>
                    </thead>
                    {myTournaments.length === 0 ? (
                        <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                            <p className="body text-white">{"You don't have any tournament yet"}</p>
                            <Link className="buttonPrimary" href="/tournaments">here</Link>
                        </div>) : (
                            <tbody className="tableBody flex flex-col gap-2">
                                {myTournaments.map((tour) => (
                                    <tr className="flex flex-row justify-around" key={tour.id}>
                                        <td className="text-center">{tour.nameTournament}</td>
                                        <td className="text-center">{tour.startDate}</td>
                                        <td className="text-center">{tour.status}</td>
                                        <td className="text-center"><button className="iconButton" value={tour.id} onClick={UnsubscribeTournament}><CancelIcon className="iconButton"/></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                </table>
            </div>
    )
}