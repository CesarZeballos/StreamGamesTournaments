import counter from "../app/assets/images/banners/csgo.jpg";
import fortnite from "../app/assets/images/banners/fortnite.jpg";
import lol from "../app/assets/images/banners/lol.png";
import previous from "../app/assets/images/icons/previous.png";
import next from "../app/assets/images/icons/next.png";
import csIcon from "../app/assets/images/icons/cs-A.png";
import ftIcon from "../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../app/assets/images/icons/lol-A.png";
import beginner from "../app/assets/images/icons/beginner-dark.png";
import advanced from "../app/assets/images/icons/advanced-dark.png";
import expert from "../app/assets/images/icons/expert-dark.png";
import vip from "../app/assets/images/icons/premium.png";
import award1 from "../app/assets/images/icons/award1.png"
import award2 from "../app/assets/images/icons/award2.png"
import award3 from "../app/assets/images/icons/award3.png"
import { StaticImageData } from "next/image";

type ImageSource = StaticImageData | string;

export const awardImages = [award1, award2, award3];

export const gameIcons: { [key: string]: ImageSource } = {
    "CounterStrike Go": csIcon,
    "Fortnite": ftIcon,
    "League of Legends": lolIcon,
};

export const categories: { [key: string]: string } = {
    "beginner": "Beginner",
    "advanced": "Advanced",
    "expert": "Expert",
};

export const categoryIcons: { [key: string]: ImageSource } = {
    "beginner": beginner,
    "advanced": advanced,
    "expert": expert,
};

export const gameImages: { [key: string]: ImageSource } = {
    "Fortnite": fortnite,
    "CounterStrike Go": counter,
    "League of Legends": lol,
};

export const gameName: { [key: string]: string } = {
    "CounterStrike Go": "Counter Strike",
    "Fortnite": "Fortnite",
    "League of Legends": "League of Legends",
};


export const navigationIcons = {
    previous,
    next,
    vip,
};

