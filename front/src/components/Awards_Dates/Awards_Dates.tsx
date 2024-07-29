import Image from "next/image";
import { categoryIcons } from "@/utils/tournamentsData";
import { ITournament } from "@/interfaces/interfaceTournaments";
import award1 from "../../app/assets/images/icons/award1.png"

export const Awards_Dates: React.FC<{ tournament: ITournament }> = ({tournament}) => {
    const award = tournament.award || "No award available";


    return (
        <div className="flex flex-col">
            <div className="flex flex-row ml-small">
                <h1 className="numberInfo text-white">{tournament.startDate}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">Tournament Start</h2>
            </div>
        <div className="bg-BGdark rounded-3xl flex flex-col justify-start p-4 m-4">
            <h1 className="heading3 text-lightViolet mt-4 mb-4">Awards</h1>
            <div className="flex flex-col mt-2">
                <div className="flex flex-row items-center mb-2">
                    <Image src={award1} alt="Award 1" className="m-icon" />
                    <p className="item-text ml-2">{award}</p>
                </div>
            </div>
        </div>
        </div>
    );
};