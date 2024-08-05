import Image from "next/image";
import { ITournament } from "@/interfaces/interfaceTournaments";
import award1 from "../../app/assets/images/icons/award1.png"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { isoToDate } from "@/utils/formatDate";

export const Awards_Dates: React.FC<{ tournament: ITournament }> = ({tournament}) => {

    const date = isoToDate(tournament.startDate);
    
    return (
        <div className="flex flex-col">
            <div className="flex flex-row ml-small">
                <h1 className="numberInfo text-white">{date}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">Tournament Start</h2>
            </div>
        <div className="bg-BGdark rounded-3xl flex flex-col justify-start p-6 m-4">
            <h1 className="heading3 text-lightViolet">
                Awards
            </h1>
            <div className="flex flex-col mt-2">
                <div className="flex flex-col items-start gap-4 mb-2">
                    <div className="flex flex-row items-center gap-4">
                        <EmojiEventsIcon className="heading1 text-lightViolet" />
                        <p className="heading5 text-lightViolet">Winner</p>
                        <p className="body text-white">{tournament.awards[0]}</p>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <EmojiEventsIcon className="heading1 text-lightViolet" />
                        <p className="heading5 text-lightViolet">Second position</p>
                        <p className="body text-white">{tournament.awards[1]}</p>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <EmojiEventsIcon className="heading1 text-lightViolet" />
                        <p className="heading5 text-lightViolet">Third position</p>
                        <p className="body text-white">{tournament.awards[2]}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};