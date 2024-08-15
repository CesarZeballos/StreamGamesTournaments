import { IChangesErrors } from "@/interfaces/interfaceUser";

export function validateChanges(values: Partial<IChangesErrors>): IChangesErrors {
    let errors: IChangesErrors = {};
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const nicknameRegex = /^[a-zA-Z0-9]+$/;
    // Validar birthdate solo si está presente
    if (values.birthdate) {
        const birthdate = new Date(values.birthdate);
        if (birthdate > eighteenYearsAgo) {
            errors.birthdate = 'You must be 18 or older to register.';
        }
    } else {
        errors.birthdate = ""; // No marcar error si birthdate no está presente
    }
    // Validar nickname solo si está presente
    if (values.nickname) {
        if (!nicknameRegex.test(values.nickname)) {
            errors.nickname = "Nickname invalid.";
        }
    } else {
        errors.nickname = ""; // No marcar error si nickname no está presente
    }
    return errors;
}
