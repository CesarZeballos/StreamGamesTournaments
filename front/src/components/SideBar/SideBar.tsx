import { useDispatch } from "react-redux";
import { setFilter } from "@/redux/slices/cardsSlice";

//icons import
import { PiMedalMilitary } from "react-icons/pi";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { TbMilitaryAward } from "react-icons/tb";

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const handleFilterClick = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="flex flex-col justify-start p-6 bg-BGdark rounded-3xl mt-8 mb-medium w-64 h-fit gap-4">
      <h1 className="heading4 text-white">Filters</h1>
      
      <div className="flex flex-col gap-2">
        <h1 className="heading5 text-lightViolet">Competition Difficulty</h1>
        <div>
          <button className="buttonFilter" onClick={() => handleFilterClick("beginner")}>
            <PiMedalMilitary />
            <p>Beginner</p>
          </button>
          <button className="buttonFilter" onClick={() => handleFilterClick("advanced")}>
            <PiMedalMilitaryFill />
            <p>Advanced</p>
          </button>
          <button className="buttonFilter" onClick={() => handleFilterClick("expert")}>
            <TbMilitaryAward />
            <p>Expert</p>
          </button>
        </div>
  

        <h1 className="heading5 text-lightViolet">Price range</h1>
        <div>
          <button className="buttonFilter" onClick={() => handleFilterClick("CHEAP")}>
          <p>$0 - $500</p>
          </button>
          <button className="buttonFilter" onClick={() => handleFilterClick("MIDDLE")}>
          <p>$501 - $1000</p>
          </button>
          <button className="buttonFilter" onClick={() => handleFilterClick("EXPENSIVE")}>
          <p>$1001 - More</p>
          </button>
        </div>

        <h1 className="heading5 text-lightViolet">Date</h1>
        <div>
          <button className="buttonFilter" onClick={() => handleFilterClick("THIS_MONTH")}>
              <p>This Month</p>
          </button>
          <button className="buttonFilter" onClick={() => handleFilterClick("NEXT_MONTHS")}>
              <p>Next Months</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
