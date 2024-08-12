import { useDispatch, useSelector } from "react-redux";

//icons import
import { PiMedalMilitary } from "react-icons/pi";
import { PiMedalMilitaryFill } from "react-icons/pi";
import { TbMilitaryAward } from "react-icons/tb";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { filterEmun, IFilters } from "@/interfaces/interfaceRedux";
import { filtered } from "@/redux/thunks/auxiliarSliceThunk";

const SideBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const category = useSelector((state: RootState) => state.tournament.filters.category)
  const price = useSelector((state: RootState) => state.tournament.filters.price)
  const date = useSelector((state: RootState) => state.tournament.filters.date)

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = event.currentTarget;
    dispatch(filtered({
      name: name as filterEmun,
      value: value
    }))
  };

  return (
    <div className="flex flex-col justify-start p-6 bg-BGdark rounded-3xl mt-8 mb-medium w-64 h-fit gap-4">
      <h1 className="heading4 text-white">Filters</h1>
      
      <div className="flex flex-col gap-2">
        <h1 className="heading5 text-lightViolet">Competition Difficulty</h1>
        <div className="flex flex-col gap-1">
          <button className={`buttonFilter ${category === "Beginner" && "buttonFilterActive"}`} name="category" value={"Beginner"} onClick={handleFilterClick}>
            <PiMedalMilitary />
            <p>Beginner</p>
          </button>
          <button className={`buttonFilter ${category === "Advanced" && "buttonFilterActive"}`} name="category" value={"Advanced"} onClick={handleFilterClick}>
            <PiMedalMilitaryFill />
            <p>Advanced</p>
          </button>
          <button className={`buttonFilter ${category === "Expert" && "buttonFilterActive"}`} name="category" value={"Expert"} onClick={handleFilterClick}>
            <TbMilitaryAward />
            <p>Expert</p>
          </button>
        </div>
  

        <h1 className="heading5 text-lightViolet">Price range</h1>
        <div className="flex flex-col gap-1">
        <button className={`buttonFilter ${price === "cheap" && "buttonFilterActive"}`} name="price" value={"cheap"} onClick={handleFilterClick}>
          <p>$0 - $500</p>
          </button>
          <button className={`buttonFilter ${price === "medium" && "buttonFilterActive"}`} name="price" value={"medium"} onClick={handleFilterClick}>
          <p>$501 - $1000</p>
          </button>
          <button className={`buttonFilter ${price === "expensive" && "buttonFilterActive"}`} name="price" value={"expensive"} onClick={handleFilterClick}>
          <p>$1001 - More</p>
          </button>
        </div>

        <h1 className="heading5 text-lightViolet">Date</h1>
        <div  className="flex flex-col gap-1">
        <button className={`buttonFilter ${date === "thisMonth" && "buttonFilterActive"}`} name="date" value={"thisMonth"} onClick={handleFilterClick}>
              <p>This Month</p>
          </button>
          <button className={`buttonFilter ${date === "nextMonths" && "buttonFilterActive"}`} name="date" value={"nextMonths"} onClick={handleFilterClick}>
              <p>Next Months</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
