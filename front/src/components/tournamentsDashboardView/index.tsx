import { ITournamentsregistered } from "@/interfaces/interfaceUser"


export const TournamentsDashboardView = ({tournaments} : {tournaments: ITournamentsregistered[]}) => {
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col">
                <h1 className="heading4 text-white">Your tournaments</h1>
                {tournaments.length === 0 ? (<p className="body text-white mt-4">{"You don't have any tournament yet"}</p>) : 
                (<div className="flex flex-col mt-4">
                    {tournaments.map((t) => (
                        <p className="body text-white" key={t.id}>{t.nameTournament}</p>
                    ))}
                </div>)}
            </div>
        </div>
    )
}