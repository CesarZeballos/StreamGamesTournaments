import { ITournament } from "@/interfaces/interfaceTournaments"
import { isoToDate } from "@/utils/formatDate"
import Image from "next/image"
import { CategoryIcon, GameIcon } from "../Tournaments/type"


export const TournamentViewInUserDashboard = ({tour}: {tour: ITournament}) => {
    const { id, nameTournament, startDate, description, game, urlAvatar, category, price } = tour

    const date = isoToDate(startDate)

    return (
        <div className="bg-BGdark rounded-3xl py-9 mr-9 h-full flex flex-col items-center gap-9 w-full">
            <Image src={urlAvatar} alt="Avatar" width={100} height={100} className="rounded-xl" />
            <h1 className="heading5 text-lightViolet">{nameTournament}</h1>
            <div className="flex flex-row gap-2">
                <h1 className="body text-white">{date}</h1>
                <h1 className="body text-white">${price}</h1>
            </div>
            <div className="flex flex-row gap-2">
                <h1 className="body text-white flex flex-row gap-1"><GameIcon game={game.name} />{game.name}</h1>
                <h1 className="body text-white flex flex-row gap-1"><CategoryIcon category={category} />{category}</h1>
            </div>
            <h1 className="body text-white">{description}</h1>
        </div>
    )
}