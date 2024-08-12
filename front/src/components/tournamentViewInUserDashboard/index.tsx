import { ITournament } from "@/interfaces/interfaceTournaments"
import { isoToDate } from "@/utils/formatDate"
import Image from "next/image"
import { CategoryIcon, GameIcon } from "../Tournaments/type"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"


export const TournamentViewInUserDashboard = ({id}: {id: string}) => {
    const tournaments = useSelector((state: RootState) => state.user.user?.tournaments)

    const tour = tournaments?.find((tour: ITournament) => tour.id === id)
    const { nameTournament, urlAvatar, startDate, description, price, game, category } = tour || {
        
    }

    const date = isoToDate(startDate!)

    return (
        <div className="bg-BGdark rounded-3xl py-9 mr-9 h-full flex flex-col items-start gap-2 w-full">
            <div className="border-lightViolet mx-6 border-4 rounded-xl overflow-hidden">
                <Image src={urlAvatar!} alt="Avatar" width={400} height={400} className="object-cover" />
            </div>
            <h1 className="heading5 text-lightViolet mx-6">{nameTournament}</h1>
            <div className="flex flex-row gap-9 mx-6">
                <h1 className="body text-white">{date}</h1>
                <h1 className="body text-white">${price}</h1>
            </div>
            <div className="flex flex-row gap-2 mx-6">
                <h1 className="body text-white flex flex-row gap-1"><GameIcon game={game!.name} />{game!.name}</h1>
                <h1 className="body text-white flex flex-row gap-1"><CategoryIcon category={category!} />{category}</h1>
            </div>
            <h1 className="body text-white mx-6">{description}</h1>
        </div>
    )
}