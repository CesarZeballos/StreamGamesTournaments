import Image from "next/image";
import React, { Suspense } from "react";
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";


export const FindBanner: React.FC = () => {
    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
<>
  <div className="ml-medium mr-medium mb-medium">
    <h1 className="heading2 text-left mb-6 ml-6 text-white">Find your tournament:</h1>
    <div className="flex flex-row justify-around p-2">
      <button className="buttonSection">
        <Image src={csIcon} alt="CSGO" className="icon" />
        <p className="textButton">CS: GO</p>
      </button>
      <button className="buttonSection">
        <Image src={ftIcon} alt="Fortnite" className="icon" />
        <p className="textButton">Fortnite</p>
      </button>
      <button className="buttonSection">
        <Image src={lolIcon} alt="LOL" className="icon" />
        <p className="textButton">League of Legends</p>
      </button>
    </div>
  </div>
</>

</Suspense>
    )
}

export default FindBanner;