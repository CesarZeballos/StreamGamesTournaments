import { ITournamentsregistered } from "@/interfaces/interfaceUser"
import Link from "next/link"


export const TournamentsDashboardView = () => {
    //creado para que no llore!!
    const tournaments: ITournamentsregistered[] = []
    //

    return (
            <div className="flex flex-col w-max">
                <h1 className="heading4 text-white">Your tournaments</h1>
                <div className="flex flex-col mt-4 gap-4">
                
                {tournaments.length === 0 ? (
                    <p className="body text-white">{"You don't have any tournament yet"}</p>
                ) : (
                    tournaments.map((t) => (
                        <p className="body text-white" key={t.id}>{t.nameTournament}</p>
                    )))}
                </div>
                <div className="flex flex-row items-center gap-4">
                    <p className="body text-white">Find amazing tournaments</p>
                    <Link className="buttonPrimary" href="/tournaments">here</Link>
                </div>
            </div>
    )
}