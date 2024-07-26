import { StaticImageData } from "next/image";

export interface ICardsState {
    cards: IBanner[];
    currentPage: number;
    cardsPerpage: number;
    filter: string;
}

export interface ICardsAction {
    type: string;
    pagina: number;
    cartas: IBanner[];
}

export interface IBanner {
    id: number;
    image: StaticImageData;
    icon1: StaticImageData;
    icon2: StaticImageData;
    icon3: StaticImageData;
    name: string;
    date: string;
}

export interface TournamentProps {
    params: {
    tournamentId: string;
    };
}

export interface IAwardsDates {
    id: number;
    icon1: StaticImageData;
    icon2: StaticImageData;
    icon3: StaticImageData;
    startDate: string;
    quarterDate: string;
    semiDate: string;
    finalDate: string;
    start: string;
    quarter: string;
    semi: string;
    final: string;
    award1: string;
    award2: string;
    award3: string;
}