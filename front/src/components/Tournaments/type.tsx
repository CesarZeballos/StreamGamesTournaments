
import { PiMedalMilitary } from "react-icons/pi";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { TbMilitaryAward } from "react-icons/tb";
import { SiLeagueoflegends } from "react-icons/si";
import { SiCounterstrike } from "react-icons/si";
import { TbBrandFortnite } from "react-icons/tb";
import { TbPremiumRights } from "react-icons/tb";
import { TbFreeRights } from "react-icons/tb";

export const CategoryIcon = ({category}: {category : string}) => {

    return (
        <>
            {category === "beginner" && (<PiMedalMilitary className="text-lightViolet"/>)}
            {category === "advanced" && (<PiMedalMilitaryFill className="text-lightViolet"/>)}
            {category === "expert" && (<TbMilitaryAward className="text-lightViolet"/>)}
        </>
    )
}

export const GameIcon = ({game}: {game : string}) => {

    return (
        <>
            {game === "League of Legends" && (<SiLeagueoflegends className="text-lightViolet"/>)}
            {game === "CounterStrike Go" && (<SiCounterstrike className="text-lightViolet"/>)}
            {game === "Fortnite" && (<TbBrandFortnite className="text-lightViolet"/>)}
        </>
    )
}

export const PriceIcon = ({price}: {price : number}) => {
    return (
        <>
            {price === 0 && (<TbFreeRights className="text-lightViolet"/>)}
            {price > 0 && (<TbPremiumRights className="text-lightViolet"/>)}
        </> 
    )
}

