import React from "react";
import Image from "next/image";
import Link from "next/link";
import csgo from "../../app/assets/images/banners/csgo.jpg";
import fortnite from "../../app/assets/images/banners/fortnite.jpg";
import lol from "../../app/assets/images/banners/lol.png";
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";
import bronze from "../../app/assets/images/icons/medal-bronze.png";
import silver from "../../app/assets/images/icons/medal-silver.png";
import gold from "../../app/assets/images/icons/medal-gold.png";
import free from "../../app/assets/images/icons/free.png";
import vip from "../../app/assets/images/icons/premium.png";
import { IBanner } from "@/interfaces/interfaceCards";

export const banners: IBanner[] = [
    {
      id: 1,
      image: csgo,
      icon1: silver,
      icon2: csIcon,
      icon3: free,
      name: "CSGO",
      date: "01/08",
    },
    {
      id: 2,
      image: fortnite,
      icon1: gold,
      icon2: ftIcon,
      icon3: free,
      name: "Fortnite",
      date: "02/08",
    },
    {
      id: 3,
      image: lol,
      icon1: bronze,
      icon2: lolIcon,
      icon3: vip,
      name: "LoL",
      date: "03/08",
    },
  ];

  export const Tournaments: React.FC<{ banner: IBanner }> = ({ banner }) => {
    return (
      <Link href={`/tournaments/${banner.id}`}>
        <div className="relative h-64 cursor-pointer">
          <Image
            src={banner.image}
            alt={banner.name}
            className="w-full h-52 rounded-3xl"
          />
          <div className="absolute bottom-5 left-0 right-0 p-4 bg-BGdark rounded-3xl">
            <div className="flex justify-between items-center mb-2">
              <h1 className="heading5 text-lightViolet">{banner.name}</h1>
              <h1 className="numberCard text-white">{banner.date}</h1>
            </div>
            <div className="flex justify-around mb-2">
              <Image src={banner.icon1} alt="Icon" className="s-icon" />
              <Image src={banner.icon2} alt="Icon" className="s-icon" />
              <Image src={banner.icon3} alt="Icon" className="s-icon" />
            </div>
          </div>
        </div>
      </Link>
    );
  };