import Image from "next/image"
import csIcon from "../../app/assets/images/icons/cs-A.png";
import ftIcon from "../../app/assets/images/icons/fortnite-A.png";
import lolIcon from "../../app/assets/images/icons/lol-A.png";
import bronze from "../../app/assets/images/icons/medal-bronze.png";
import silver from "../../app/assets/images/icons/medal-silver.png";
import gold from "../../app/assets/images/icons/medal-gold.png";

const SideBar: React.FC = () => {
    return (
        <>
        <div className="bodyContainer">
        <h1 className="heading3 text-white"></h1>
        <div className="flex flex-col justify-start p-2 bg-BGdark rounded-3xl">
        <div className="section">
        <h1>Game</h1>
        <div className="item">
        <Image src={csIcon} alt="CS: GO" className="icon" />
        <p className="item-text">CS: GO</p>
        </div>
        <div className="item">
        <Image src={ftIcon} alt="Fortnite" className="icon" />
        <p className="item-text">Fortnite</p>
        </div>
        <div className="item">
        <Image src={lolIcon} alt="LoL" className="icon" />
        <p className="item-text">League of Legends</p>
        </div>
        </div>
        <div className="section">
        <h1>Competition Difficulty</h1>
        <div className="item">
        <Image src={bronze} alt="Beginner" className="icon" />
        <p className="textButton">Beginner</p>
        </div>
        <div className="item">
        <Image src={silver} alt="Advanced" className="icon" />
        <p className="textButton">Advanced</p>
        </div>
        <div className="item">
        <Image src={gold} alt="Expert" className="icon" />
        <p className="textButton">Expert</p>
        </div>
        </div>
        <h1>Price-Range</h1>
        <p></p>
        <p></p>
        <p></p>
        <h1>Date</h1>
        <p></p>
        <p></p>
        <p></p>
        </div>
        </div>
        </>
    )
}

export default SideBar;