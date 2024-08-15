import { IFirstStep } from "@/interfaces/interfaceRedux";
import { ITournamentPost, ITournamentPostError } from "@/interfaces/interfaceTournaments";

export function validateTournament(values: any): ITournamentPostError {
    let errors: ITournamentPostError = {} as ITournamentPostError;

    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    if (!values.nameTournament) {
        errors.nameTournament = "Tournament name is required.";
    } else if (values.nameTournament.length < 10) {
        errors.nameTournament = "Tournament name must be at least 10 characters.";
    } else if (values.nameTournament.length > 25) {
        errors.nameTournament = "Tournament name must be no more than 25 characters.";
    }

    if (!values.startDate) {
        errors.startDate = "Start date is required.";
    } else if (values.startDate < today) {
        errors.startDate = "Start date cannot be earlier than today.";
    }

    if (!values.membersNumber) {
        errors.membersNumber = "Members number is required.";
    } else if (Number(values.membersNumber) < 0) {
        errors.membersNumber = "Members number cannot be less than 0.";
    } else if (Number(values.membersNumber) > 10) {
        errors.membersNumber = "Members number cannot be more than 10.";
    }

    if (!values.maxTeam) {
        errors.maxTeam = "Max team number is required.";
    } else if (Number(values.maxTeam) < 2) {
        errors.maxTeam = "Max team number cannot be less than 2.";
    }

    if (values.price && Number(values.price) < 0) {
        errors.price = "Price cannot be less than 0.";
    }

    if (!values.description) {
        errors.description = "Description is required.";
    } else if (values.description.length < 100) {
        errors.description = "Description must be at least 100 characters.";
    } else if (values.description.length > 500) {
        errors.description = "Description must be no more than 500 characters.";
    }

    return errors;
}