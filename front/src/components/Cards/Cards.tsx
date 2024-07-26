// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/redux/store";
// import { IBanner } from "@/interfaces/interfaceCards";
// import { banners, Tournaments } from "../Tournaments/Tournaments";
// import { useMemo, useEffect } from "react";
// import { setCards, setCurrentPage } from "@/redux/slices/cardsSlice";

// const Cards: React.FC = () => {
//   const cardsState = useSelector((state: RootState) => state.cards);
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     if (cardsState.cards.length === 0) {
//       const duplicates = Array.from({ length: 27 }, (_, index) => banners[index % banners.length]);
//       const randomizedCards = duplicates.sort(() => Math.random() - 0.5);
//       dispatch(setCards({ cards: randomizedCards }));
//     }
//   }, [dispatch, cardsState.cards.length]);

//   // Obtener las cartas filtradas
//   const filteredCards = useMemo(() => {
//     if (cardsState.filter === "All Tournaments") {
//       return cardsState.cards;
//     }
//     return cardsState.cards.filter(card => card.name === cardsState.filter);
//   }, [cardsState.cards, cardsState.filter]);

//   // Total de páginas considerando todas las cartas o las filtradas
//   const totalPages = useMemo(() => {
//     const relevantCards = cardsState.filter === "All Tournaments" ? cardsState.cards : filteredCards;
//     if (relevantCards.length === 0) return 0;
//     return Math.min(Math.ceil(relevantCards.length / (cardsState.cardsPerpage || 1)), 3);
//   }, [cardsState.cards, filteredCards, cardsState.cardsPerpage, cardsState.filter]);

//   // Cartas paginadas considerando todas las cartas o las filtradas
//   const cardsPaginated: IBanner[] = useMemo(() => {
//     const relevantCards = cardsState.filter === "All Tournaments" ? cardsState.cards : filteredCards;
//     const indexStart = Math.max((cardsState.currentPage - 1) * (cardsState.cardsPerpage || 1), 0);
//     const indexEnd = Math.min(indexStart + (cardsState.cardsPerpage || 1), relevantCards.length);
//     return relevantCards.slice(indexStart, indexEnd);
//   }, [cardsState.cards, filteredCards, cardsState.currentPage, cardsState.cardsPerpage, cardsState.filter]);

//   const handleChangePage = (page: number) => {
//     dispatch(setCurrentPage(page));
//   };

//   return (
//     <div>
//       {cardsState.cards.length > 0 && (
//         <>
//           <div className="grid grid-cols-3 gap-x-6 gap-y-6 w-full ml-small mt-8">
//             {cardsPaginated.map((banner: IBanner, index: number) => (
//               <Tournaments key={`${banner.id}-${index}`} banner={banner}/>
//             ))}
//           </div>
//           <div className="flex justify-center mt-4">
//             {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handleChangePage(page)}
//                 className="buttonPage mx-4"
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cards;