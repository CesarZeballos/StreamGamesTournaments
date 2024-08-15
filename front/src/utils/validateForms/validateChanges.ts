import { IChangesErrors } from "@/interfaces/interfaceUser";

export function validateChanges(values: IChangesErrors): IChangesErrors {
    let errors: IChangesErrors = {};

    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const nicknameRegex = /^[a-zA-Z0-9]+$/;

    if (!values.birthdate) {
        errors.birthdate = "Birthdate is required.";
    } else if (new Date(values.birthdate) > eighteenYearsAgo) {
            errors.birthdate = 'You must be 18 or older to register.';
    }
    
    if (!values.nickname) {
        errors.nickname = "Nickname is required.";
    }else if (!nicknameRegex.test(values.nickname)) {
        errors.nickname = "Nickname invalid.";
    }
    
    return errors
}