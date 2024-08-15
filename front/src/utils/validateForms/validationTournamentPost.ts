import { IFirstStep } from "@/interfaces/interfaceRedux";
import { IFirstStepError, ISecondStepError, ITournamentPost } from "@/interfaces/interfaceTournaments";

export function validateTournamentFirstStep(values: any): IFirstStepError {
    let errors: IFirstStepError = {} as IFirstStepError;

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

    if (!values.category) {
        errors.category = "Category is required.";
    }

    if (!values.gameId) {
        errors.gameId = "Game is required.";
    }

    return errors;
}

export function validateTournamentSecondStep(values: any): ISecondStepError {
    let errors: ISecondStepError = {} as ISecondStepError;

    if (!values.membersNumber) {
        errors.membersNumber = "Members number is required.";
    } else if (Number(values.membersNumber) < 0) {
        errors.membersNumber = "Members number cannot be less than 0.";
    } else if (Number(values.membersNumber) > 10) {
        errors.membersNumber = "Members number cannot be more than 10.";
    }

    if (!values.maxTeams) { // Cambié de maxTeam a maxTeams para que coincida con tu código
        errors.maxTeam = "Max team number is required.";
    } else if (Number(values.maxTeams) < 2) {
        errors.maxTeam = "Max team number cannot be less than 2.";
    } else if (Number(values.maxTeams) % 2 !== 0) {
        errors.maxTeam = "Max team number cannot be an odd number.";
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








// export function validateTournament(values: any): ITournamentPostError {
//     let errors: ITournamentPostError = {} as ITournamentPostError;





//     return errors;
// }