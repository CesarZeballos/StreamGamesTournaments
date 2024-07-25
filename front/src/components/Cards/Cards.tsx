"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { IBanner } from "@/interfaces/interfaceCards";
import { banners, Tournaments } from "../Tournaments/Tournaments";
import { useMemo, useEffect } from "react";
import { setCartas, setPaginaActual } from "@/redux/slices/cardsSlice";

const Cards: React.FC = () => {
  const cardsState = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();
  
  const cartasRandomizadas = useMemo(() => {
    const duplicados = [...banners, ...banners, ...banners];
    return duplicados.sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    console.log("Cartas Aleatorizadas:", cartasRandomizadas);
    dispatch(setCartas({ cartas: cartasRandomizadas }));
  }, [cartasRandomizadas, dispatch]);

  useEffect(() => {
    console.log("Estado de Redux Actualizado:", cardsState.cartas);
  }, [cardsState.cartas]);

  const totalPaginas = useMemo(() => {
    if (cardsState.cartas.length === 0) return 0;
    return Math.min(Math.ceil(cardsState.cartas.length / (cardsState.cartasPorPagina || 1)), 3);
  }, [cardsState.cartas, cardsState.cartasPorPagina]);

  const cartasPaginadas: IBanner[] = useMemo(() => {
    const indiceInicio = Math.max((cardsState.paginaActual - 1) * (cardsState.cartasPorPagina || 1), 0);
    const indiceFin = Math.min(indiceInicio + (cardsState.cartasPorPagina || 1), cardsState.cartas.length);
    return cardsState.cartas.slice(indiceInicio, indiceFin);
  }, [cardsState.cartas, cardsState.paginaActual, cardsState.cartasPorPagina]);

  console.log("Número de Páginas:", totalPaginas);
  console.log("Cartas en Página Actual:", cartasPaginadas);

  const handleCambioPagina = (pagina: number) => {
    console.log(`Cambio a Página: ${pagina}`);
    dispatch(setPaginaActual(pagina));
  };

  return (
    <div>
      {cardsState.cartas.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-4 w-full ml-small mt-8">
            {cartasPaginadas.map((banner: IBanner, index: number) => (
              <Tournaments key={`${banner.number}-${index}`} banner={banner} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((pagina) => (
              <button
                key={pagina}
                onClick={() => handleCambioPagina(pagina)}
                className={`px-2 py-1 mx-1 ${cardsState.paginaActual === pagina ? 'bg-gray-200' : ''}`}
              >
                {pagina}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;