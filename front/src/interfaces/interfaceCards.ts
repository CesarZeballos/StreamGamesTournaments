import { StaticImageData } from "next/image";

export interface ICardsState {
    cards: IBanner[];
    currentPage: number;
    cardsPerpage: number;
}

export interface ICardsAction {
    type: string;
    pagina: number;
    cartas: IBanner[];
}

export interface IBanner {
    number: number;
    image: StaticImageData;
    icon1: StaticImageData;
    icon2: StaticImageData;
    icon3: StaticImageData;
    name: string;
    date: string;
}