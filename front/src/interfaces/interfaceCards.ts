import { StaticImageData } from "next/image";
import { ITournament } from "./interfaceTournaments";

export interface ICardsState {
    cards: ITournament[];
    currentPage: number;
    cardsPerpage: number;
    filter: string;
}

export interface ICardsAction {
    type: string;
    pagina: number;
    cartas: ITournament[];
}

export interface TournamentProps {
    params: {
    tournamentId: string;
    };
}

export interface IAwardsDates {
    id: number;
    icon1: StaticImageData;
    icon2?: StaticImageData;
    icon3?: StaticImageData;
    startDate: string;
    award1: number;
    award2?: number;
    award3?: number;
}