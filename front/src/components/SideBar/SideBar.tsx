import Image from "next/image";
import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/slices/cardsSlice";
import beginner from "../../app/assets/images/icons/beginner-dark.png";
import advanced from "../../app/assets/images/icons/advanced-dark.png";
import expert from "../../app/assets/images/icons/expert-dark.png";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const handleFilterClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex flex-col justify-start p-6 bg-BGdark rounded-3xl mt-8 mb-medium w-full h-fit">
      <h1 className="heading4 text-white">Filters</h1>
      <div>
        <h1 className="section-title">Competition Difficulty</h1>
        <button className="item-container" onClick={() => handleFilterClick("beginner")}>
          <Image src={beginner} alt="Beginner" className="item-image" />
          <p className="item-text">Beginner</p>
        </button>
        <button className="item-container" onClick={() => handleFilterClick("advanced")}>
          <Image src={advanced} alt="Advanced" className="item-image" />
          <p className="item-text">Advanced</p>
        </button>
        <button className="item-container" onClick={() => handleFilterClick("expert")}>
          <Image src={expert} alt="Expert" className="item-image" />
          <p className="item-text">Expert</p>
        </button>
      </div>
      <div>
        <h1 className="section-title">Price-Range</h1>
        <div>
          <button className="item-container" onClick={() => handleFilterClick("CHEAP")}>
          <p className="item-text">$0 - $500</p>
          </button>
          <button className="item-container" onClick={() => handleFilterClick("MIDDLE")}>
          <p className="item-text">$501 - $1000</p>
          </button>
          <button className="item-container" onClick={() => handleFilterClick("EXPENSIVE")}>
          <p className="item-text">$1001 - More</p>
          </button>
        </div>
      </div>
        <h1 className="section-title">Date</h1>
      <div>
          <button className="item-container" onClick={() => handleFilterClick("THIS_MONTH")}>
              <p className="item-text">This Month</p>
          </button>
          <button className="item-container" onClick={() => handleFilterClick("NEXT_MONTHS")}>
              <p className="item-text">Next Months</p>
          </button>
      </div>
    </div>
  );
};

export default SideBar;
