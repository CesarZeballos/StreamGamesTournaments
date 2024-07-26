"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { IBanner } from "@/interfaces/interfaceCards";
import { banners, Tournaments } from "../Tournaments/Tournaments";
import { useMemo, useEffect } from "react";
import { setCards, setCurrentPage } from "@/redux/slices/cardsSlice";

const Cards: React.FC = () => {
  const cardsState = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (cardsState.cards.length === 0) {
      const duplicates = Array.from({ length: 27 }, (_, index) => banners[index % banners.length]);
      const randomizedCards = duplicates.sort(() => Math.random() - 0.5);
      console.log("Randomized Cards:", randomizedCards);
      dispatch(setCards({ cards: randomizedCards }));
    }
  }, [dispatch, cardsState.cards.length]);

  useEffect(() => {
    console.log("Updated Redux State:", cardsState.cards);
  }, [cardsState.cards]);

  const totalPages = useMemo(() => {
    if (cardsState.cards.length === 0) return 0;
    return Math.min(Math.ceil(cardsState.cards.length / (cardsState.cardsPerpage || 1)), 3);
  }, [cardsState.cards, cardsState.cardsPerpage]);

  const cardsPaginated: IBanner[] = useMemo(() => {
    const indexStart = Math.max((cardsState.currentPage - 1) * (cardsState.cardsPerpage || 1), 0);
    const indexEnd = Math.min(indexStart + (cardsState.cardsPerpage || 1), cardsState.cards.length);
    return cardsState.cards.slice(indexStart, indexEnd);
  }, [cardsState.cards, cardsState.currentPage, cardsState.cardsPerpage]);

  console.log("Total Pages:", totalPages);
  console.log("Cards on Current Page:", cardsPaginated);

  const handleChangePage = (page: number) => {
    console.log(`Change to Page: ${page}`);
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      {cardsState.cards.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 w-full ml-small mt-8">
            {cardsPaginated.map((banner: IBanner, index: number) => (
              <Tournaments key={`${banner.id}-${index}`} banner={banner}/>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleChangePage(page)}
                className="buttonPage mx-4"
              >
                {page}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;