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
        <div className="flex flex-col justify-start p-medium bg-BGdark rounded-3xl mt-8 mb-medium w-fit h-fit">
        <h1 className="heading4 text-white">Filters</h1>
        <div className="section">
        <h1 className="heading5 text-lightViolet">Competition Difficulty</h1>
        <div className="item">
        <Image src={bronze} alt="Beginner" className="icon" />
        <p className="item-text">Beginner</p>
        </div>
        <div className="item">
        <Image src={silver} alt="Advanced" className="icon" />
        <p className="item-text">Advanced</p>
        </div>
        <div className="item">
        <Image src={gold} alt="Expert" className="icon" />
        <p className="item-text">Expert</p>
        </div>
        </div>
        <div className="section">
        <h1 className="heading5 text-lightViolet">Price-Range</h1>
        <div>
        <p className="section-text">$0 - $500</p>
        <p className="section-text">$501 - $1000</p>
        <p className="section-text">$1001 - More</p>
        </div>
        </div>
        <div className="section">
        <h1 className="heading5 text-lightViolet">Date</h1>
        <div>
        <p className="section-text">Next Week</p>
        <p className="section-text">Next Two Week</p>
        <p className="section-text">Next Mounth</p>
        </div>
        </div>
        </div>
        </>
    )
}

export default SideBar;