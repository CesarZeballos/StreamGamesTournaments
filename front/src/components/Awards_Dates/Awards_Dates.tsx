import Image from "next/image";
import { IAwardsDates } from "@/interfaces/interfaceCards";
import bronze from "../../app/assets/images/icons/medal-bronze.png";
import silver from "../../app/assets/images/icons/medal-silver.png";
import gold from "../../app/assets/images/icons/medal-gold.png";

export const data = [
    {id:1, startDate: "09/08", start: "Tournament Start", quarterDate: "16/08", quarter: "Quarter-Finals", semiDate: "23/08", semi: "Semi-Final", finalDate: "30/08", final: "Final", award1: "4000 Riot Points" , award2: "2000 Riot Points", award3: "1000 Riot Points", icon1: gold, icon2: silver, icon3: bronze},
    {id:2, startDate: "10/08", start: "Tournament Start", quarterDate: "17/08", quarter: "Quarter-Finals", semiDate: "24/08", semi: "Semi-Final", finalDate: "31/08", final: "Final", award1: "4000 Riot Points" , award2: "2000 Riot Points", award3: "1000 Riot Points", icon1: gold, icon2: silver, icon3: bronze},
    {id:3, startDate: "11/08", start: "Tournament Start", quarterDate: "18/08", quarter: "Quarter-Finals", semiDate: "25/08", semi: "Semi-Final", finalDate: "1/09", final: "Final", award1: "4000 Riot Points" , award2: "2000 Riot Points", award3: "1000 Riot Points", icon1: gold, icon2: silver, icon3: bronze},
];

export const Awards_Dates: React.FC<{ data: IAwardsDates }> = ({ data }) => {
    return (
        <div className="bg-BGdark rounded-3xl flex flex-col justify-start p-4 m-4">
            <div className="flex flex-row">
                <h1 className="numberInfo text-white">{data.startDate}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">{data.start}</h2>
            </div>
            <div className="flex flex-row">
                <h1 className="numberInfo text-white">{data.quarterDate}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">{data.quarter}</h2>
            </div>
            <div className="flex flex-row">
                <h1 className="numberInfo text-white">{data.semiDate}</h1>
                <h2 className="heading3 text-white ml-4 mt-1">{data.semi}</h2>
            </div>
            <div className="flex flex-row">
                <h1 className="numberInfo text-white">{data.finalDate}</h1>
                <h2 className="heading3 text-lightViolet ml-4 mt-1">{data.final}</h2>
            </div>
            <h1 className="heading3 text-lightViolet mt-4 mb-4">Awards</h1>
            <div className="flex flex-col mt-2">
                <div className="flex flex-row items-center mb-2">
                    <Image src={data.icon1} alt="Award 1" className="icon" width={32} height={32} />
                    <p className="item-text ml-2">{data.award1}</p>
                </div>
                <div className="flex flex-row items-center mb-2">
                    <Image src={data.icon2} alt="Award 2" className="icon" width={32} height={32} />
                    <p className="item-text ml-2">{data.award2}</p>
                </div>
                <div className="flex flex-row items-center mb-2">
                    <Image src={data.icon3} alt="Award 3" className="icon" width={32} height={32} />
                    <p className="item-text ml-2">{data.award3}</p>
                </div>
            </div>
        </div>
    );
};