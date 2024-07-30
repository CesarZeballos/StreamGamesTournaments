import Image from "next/image";
import { ITournament } from "@/interfaces/interfaceTournaments";
import award1 from "../../app/assets/images/icons/award1.png"
import award2 from "../../app/assets/images/icons/award2.png"
import award3 from "../../app/assets/images/icons/award3.png"

const awardImages = [award1, award2, award3];

export const Awards_Dates: React.FC<{ tournament: ITournament }> = ({ tournament }) => {
    const awards = tournament.award.map((award, index) => {
        const awardImage = awardImages[index];

        return (
            <div key={index} className="award-area">
                <Image src={awardImage} alt={`Award ${award}`} className="m-icon" />
                <p className="heading4 text-white ml-2">{award}</p>
            </div>
        );
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-row ml-small">
                <h1 className="numberInfo text-white">{tournament.startDate}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">Tournament Start</h2>
            </div>
            <div className="bg-BGdark rounded-3xl flex flex-col justify-start p-4 m-4">
                <h1 className="heading3 text-lightViolet mt-4 mb-4">Awards</h1>
                <div className="flex flex-col mt-2">
                    {awards}
                </div>
            </div>
        </div>
    );
};