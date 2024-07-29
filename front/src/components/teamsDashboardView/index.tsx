import { ITeam } from "@/interfaces/interfaceUser"

export const TeamsDashboardView = ({teams} : {teams: ITeam[]}) => {
    return (
        <div className="grid grid-cols-2">
            <div className="flex flex-col">
                <h1 className="heading4 text-white">Your teams</h1>
                {teams.length === 0 ? (<p className="body text-white mt-4">{"You don't have any team yet"}</p>) : 
                    <div className="flex flex-col mt-4">
                        {teams.map((t) => (
                            <p className="body text-white" key={t.id}>{t.name}</p>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}